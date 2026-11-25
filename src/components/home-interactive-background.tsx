"use client";

import { useEffect, useRef } from "react";

interface MonoStop {
  at: number;
  base: number;
  mid: number;
  glow: number;
}

interface StarParticle {
  xRatio: number;
  yRatio: number;
  radius: number;
  alpha: number;
  depth: number;
  layer: 0 | 1 | 2;
  hasFlare: boolean;
}

interface MeteorSpec {
  xRatio: number;
  yRatio: number;
  length: number;
  angle: number;
  triggerOffset: number;
}

const MONO_STOPS: MonoStop[] = [
  { at: 0, base: 0, mid: 10, glow: 34 },
  { at: 0.35, base: 4, mid: 18, glow: 46 },
  { at: 0.68, base: 3, mid: 15, glow: 38 },
  { at: 1, base: 0, mid: 8, glow: 20 },
];

const METEORS: MeteorSpec[] = [
  { xRatio: 0.22, yRatio: 0.18, length: 110, angle: 0.42, triggerOffset: 0.1 },
  { xRatio: 0.76, yRatio: 0.26, length: 140, angle: 0.38, triggerOffset: 0.45 },
  { xRatio: 0.52, yRatio: 0.72, length: 95, angle: 0.44, triggerOffset: 0.78 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleMonoTone(progress: number): {
  base: number;
  mid: number;
  glow: number;
} {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < MONO_STOPS.length - 1; i += 1) {
    const start = MONO_STOPS[i];
    const end = MONO_STOPS[i + 1];
    if (clamped >= start.at && clamped <= end.at) {
      const localT = (clamped - start.at) / Math.max(0.0001, end.at - start.at);
      return {
        base: Math.round(lerp(start.base, end.base, localT)),
        mid: Math.round(lerp(start.mid, end.mid, localT)),
        glow: Math.round(lerp(start.glow, end.glow, localT)),
      };
    }
  }
  const last = MONO_STOPS[MONO_STOPS.length - 1];
  return { base: last.base, mid: last.mid, glow: last.glow };
}

function createStarfield(count: number): StarParticle[] {
  const items: StarParticle[] = [];
  let seed = 8731;
  const nextRand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i += 1) {
    const layer = (i % 3) as 0 | 1 | 2;
    const depthBase = layer === 0 ? 0.05 : layer === 1 ? 0.14 : 0.28;
    const isBrightStar = layer === 2 && i % 11 === 0;
    items.push({
      xRatio: nextRand(),
      yRatio: nextRand(),
      radius: isBrightStar
        ? 1.55
        : layer === 2
          ? 0.95 + nextRand() * 0.55
          : 0.45 + nextRand() * 0.55,
      alpha: isBrightStar
        ? 0.42
        : (layer === 2 ? 0.18 : 0.07) + nextRand() * 0.12,
      depth: depthBase + nextRand() * 0.08,
      layer,
      hasFlare: isBrightStar,
    });
  }
  return items;
}

export function HomeInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const stars = createStarfield(132);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let smoothedVelocity = 0;
    let scrollDirection = 1;

    let pointerActive = false;
    let pointerInfluence = 0;
    let targetPointerX = width * 0.55;
    let targetPointerY = height * 0.5;
    let currentPointerX = targetPointerX;
    let currentPointerY = targetPointerY;

    let rafId: number | null = null;
    let destroyed = false;

    const getScrollProgress = (scrollVal: number): number => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return Math.max(0, Math.min(1, scrollVal / maxScroll));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStarFlare = (x: number, y: number, arm: number, alpha: number) => {
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(x - arm, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x, y - arm);
      ctx.lineTo(x, y + arm);
      ctx.stroke();
    };

    const drawFrame = (scrollPos: number, velocityBoost: number) => {
      const progress = getScrollProgress(scrollPos);
      const { base, mid, glow } = sampleMonoTone(progress);
      const normX =
        (currentPointerX / Math.max(1, width) - 0.5) * pointerInfluence;
      const normY =
        (currentPointerY / Math.max(1, height) - 0.5) * pointerInfluence;

      ctx.globalCompositeOperation = "source-over";

      // 1. Interactive monochrome base gradient shifting angle & luminance with scroll + pointer
      const gradAngleShift = normX * width * 0.25 + (progress - 0.5) * width * 0.2;
      const bgGradient = ctx.createLinearGradient(
        width * 0.5 - gradAngleShift,
        0,
        width * 0.5 + gradAngleShift,
        height
      );
      bgGradient.addColorStop(0, `rgb(${base}, ${base}, ${base})`);
      bgGradient.addColorStop(
        0.48 + normY * 0.08,
        `rgb(${mid}, ${mid}, ${mid})`
      );
      bgGradient.addColorStop(1, `rgb(${base}, ${base}, ${base})`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive deep-space monochrome nebula clouds & radial horizon illumination
      const neb1X = width * (0.28 + progress * 0.36) + normX * 65;
      const neb1Y = height * (0.34 + Math.sin(progress * Math.PI) * 0.2) + normY * 45;
      const neb1 = ctx.createRadialGradient(
        neb1X,
        neb1Y,
        0,
        neb1X,
        neb1Y,
        Math.max(width, height) * 0.62
      );
      neb1.addColorStop(0, `rgba(${glow}, ${glow}, ${glow}, 0.52)`);
      neb1.addColorStop(0.45, `rgba(${mid}, ${mid}, ${mid}, 0.24)`);
      neb1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2X = width * (0.78 - progress * 0.28) - normX * 55;
      const neb2Y = height * (0.64 - Math.cos(progress * Math.PI) * 0.16) - normY * 40;
      const neb2 = ctx.createRadialGradient(
        neb2X,
        neb2Y,
        0,
        neb2X,
        neb2Y,
        Math.max(width, height) * 0.52
      );
      const glow2 = Math.round(glow * 0.85);
      neb2.addColorStop(0, `rgba(${glow2}, ${glow2}, ${glow2}, 0.42)`);
      neb2.addColorStop(0.5, `rgba(${mid}, ${mid}, ${mid}, 0.18)`);
      neb2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // Interactive pointer radial sheen
      if (pointerInfluence > 0.02) {
        const cursorLight = ctx.createRadialGradient(
          currentPointerX,
          currentPointerY,
          0,
          currentPointerX,
          currentPointerY,
          320
        );
        cursorLight.addColorStop(
          0,
          `rgba(255, 255, 255, ${(0.095 * pointerInfluence).toFixed(3)})`
        );
        cursorLight.addColorStop(
          0.45,
          `rgba(200, 200, 200, ${(0.03 * pointerInfluence).toFixed(3)})`
        );
        cursorLight.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = cursorLight;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Outer-space element: Distant monochrome eclipsed planet / lunar limb
      const planetRadius = Math.min(width, height) * 0.34;
      const planetX = width * (0.84 - progress * 0.16) - normX * 36;
      const planetY = height * (0.24 + progress * 0.48) - normY * 28;

      // Atmospheric crescent rim halo behind the dark planetary disc
      const rimGlow = ctx.createRadialGradient(
        planetX - planetRadius * 0.18,
        planetY - planetRadius * 0.18,
        planetRadius * 0.82,
        planetX,
        planetY,
        planetRadius * 1.24
      );
      rimGlow.addColorStop(0, "rgba(255, 255, 255, 0)");
      rimGlow.addColorStop(0.62, "rgba(255, 255, 255, 0.16)");
      rimGlow.addColorStop(0.76, "rgba(220, 220, 220, 0.06)");
      rimGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rimGlow;
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius * 1.24, 0, Math.PI * 2);
      ctx.fill();

      // Dark shadowed planetary body
      const planetBody = ctx.createRadialGradient(
        planetX - planetRadius * 0.35,
        planetY - planetRadius * 0.35,
        planetRadius * 0.1,
        planetX,
        planetY,
        planetRadius
      );
      planetBody.addColorStop(0, "rgba(26, 26, 26, 0.72)");
      planetBody.addColorStop(0.55, "rgba(6, 6, 6, 0.92)");
      planetBody.addColorStop(1, "rgba(0, 0, 0, 0.98)");
      ctx.fillStyle = planetBody;
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      ctx.fill();

      // Crisp orbital arc encircling the distant planet
      ctx.save();
      ctx.translate(planetX, planetY);
      ctx.rotate(-0.34 + progress * 0.25 + normX * 0.06);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.11)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, planetRadius * 1.62, planetRadius * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.065)";
      ctx.beginPath();
      ctx.ellipse(0, 0, planetRadius * 1.92, planetRadius * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 4. Outer-space element: 3-depth starfield with diffraction flares & velocity streaks
      const streakLength = velocityBoost * 16 * scrollDirection;
      for (const star of stars) {
        const px =
          ((star.xRatio * width - normX * (star.layer + 1) * 16) % width +
            width) %
          width;
        const py =
          ((star.yRatio * height -
            scrollPos * star.depth -
            normY * (star.layer + 1) * 12) %
            height +
            height) %
          height;

        // Subtle brightness twinkle tied to scroll phase
        const twinkle =
          0.78 + 0.22 * Math.sin(scrollPos * 0.012 + star.xRatio * 40);
        const alpha = star.alpha * twinkle;

        if (Math.abs(streakLength) > 1.2 && star.layer >= 1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.9).toFixed(3)})`;
          ctx.lineWidth = star.radius * 0.85;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py - streakLength * star.depth * 3.4);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, star.radius, 0, Math.PI * 2);
          ctx.fill();

          if (star.hasFlare) {
            drawStarFlare(px, py, 6.5, alpha * 0.65);
          }
        }
      }

      // Subtle velocity-reactive shooting stars in deep space
      if (velocityBoost > 0.08) {
        for (const meteor of METEORS) {
          const cycle = (progress * 3.2 + meteor.triggerOffset) % 1;
          const mx = (meteor.xRatio + cycle * 0.25) * width;
          const my = (meteor.yRatio + cycle * 0.14) * height;
          const dx = Math.cos(meteor.angle) * meteor.length;
          const dy = Math.sin(meteor.angle) * meteor.length;
          const mGrad = ctx.createLinearGradient(mx, my, mx - dx, my - dy);
          const mAlpha = Math.min(0.32, velocityBoost * 0.28);
          mGrad.addColorStop(0, `rgba(255, 255, 255, ${mAlpha.toFixed(3)})`);
          mGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.strokeStyle = mGrad;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(mx - dx, my - dy);
          ctx.stroke();
        }
      }

      // 5. Dense tightly-packed silky ribbon mesh (34 closely-spaced filaments)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      const filamentCount = width < 768 ? 24 : 34;
      const step = width < 768 ? 22 : 16;
      const ribbonCenterY =
        height * (0.56 - Math.sin(progress * Math.PI) * 0.1) + normY * 28;
      const scrollPhase = scrollPos * 0.0022;
      const bandThickness = (width < 768 ? 64 : 96) * (1 + velocityBoost * 0.28);
      const footerFade = 1 - Math.max(0, (progress - 0.85) / 0.15) * 0.45;

      // Soft ambient ribbon glow band behind the tight filaments
      const bandGlow = ctx.createLinearGradient(
        0,
        ribbonCenterY - bandThickness * 1.3,
        0,
        ribbonCenterY + bandThickness * 1.3
      );
      bandGlow.addColorStop(0, "rgba(255, 255, 255, 0)");
      bandGlow.addColorStop(
        0.5,
        `rgba(255, 255, 255, ${(0.055 * footerFade).toFixed(3)})`
      );
      bandGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = bandGlow;
      ctx.fillRect(
        0,
        ribbonCenterY - bandThickness * 1.3,
        width,
        bandThickness * 2.6
      );

      for (let i = 0; i < filamentCount; i += 1) {
        // Normalized index u in [-1, 1] across the tight bundle
        const u = (i / (filamentCount - 1)) * 2 - 1;
        const centerWeight = 1 - Math.abs(u);
        const alpha =
          (0.028 + Math.pow(centerWeight, 1.45) * 0.125) *
          (1 + velocityBoost * 0.35) *
          footerFade;

        ctx.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const xNorm = x / Math.max(1, width);

          // Main sweeping silk spine
          const spineY =
            Math.sin(xNorm * Math.PI * 1.65 + scrollPhase) *
              (42 + velocityBoost * 24) +
            Math.cos(xNorm * Math.PI * 0.9 - scrollPhase * 0.55) * 26 +
            (xNorm - 0.5) * (62 * Math.cos(progress * Math.PI * 0.9));

          // 3D twisting & pinch modulation keeping filaments tightly bundled
          const twistWave = Math.sin(
            xNorm * Math.PI * 1.45 + scrollPhase * 0.72 + progress * 1.4
          );
          const filamentOffset =
            u * bandThickness * (0.22 + 0.78 * Math.abs(twistWave));
          const microRipple =
            Math.sin(xNorm * Math.PI * 2.4 + scrollPhase * 1.15 + u * 1.15) *
            (10 + velocityBoost * 8) *
            (0.4 + 0.6 * centerWeight);

          // Interactive pointer deflection when cursor glides over the silk ribbon
          let pointerDeflect = 0;
          if (pointerInfluence > 0.02) {
            const dx = x - currentPointerX;
            const approxY = ribbonCenterY + spineY + filamentOffset;
            const dy = approxY - currentPointerY;
            const distSq = dx * dx + dy * dy;
            if (distSq < 75000) {
              const falloff = Math.exp(-distSq / 26000);
              pointerDeflect =
                (dy >= 0 ? 1 : -1) * falloff * 26 * pointerInfluence;
            }
          }

          const y =
            ribbonCenterY +
            spineY +
            filamentOffset +
            microRipple +
            pointerDeflect;

          if (x === -step) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.lineWidth = centerWeight > 0.75 ? 1.15 : 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // 6. Edge vignette keeping text contrast crisp
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        Math.min(width, height) * 0.26,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.88
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.56)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const tick = () => {
      if (destroyed) return;

      const scrollDelta = targetScroll - currentScroll;
      if (Math.abs(scrollDelta) > 0.5) {
        scrollDirection = scrollDelta > 0 ? 1 : -1;
      }
      currentScroll += scrollDelta * 0.085;
      const instantVelocity = Math.min(1.25, Math.abs(scrollDelta) / 135);
      smoothedVelocity = lerp(smoothedVelocity, instantVelocity, 0.12);

      const pointerTargetInfluence = pointerActive ? 1 : 0;
      pointerInfluence = lerp(pointerInfluence, pointerTargetInfluence, 0.08);
      currentPointerX = lerp(currentPointerX, targetPointerX, 0.1);
      currentPointerY = lerp(currentPointerY, targetPointerY, 0.1);

      drawFrame(currentScroll, smoothedVelocity);

      const pointerMoving =
        Math.abs(targetPointerX - currentPointerX) > 0.35 ||
        Math.abs(targetPointerY - currentPointerY) > 0.35 ||
        Math.abs(pointerTargetInfluence - pointerInfluence) > 0.01;

      const scrollMoving =
        Math.abs(scrollDelta) > 0.15 || smoothedVelocity > 0.008;

      if (scrollMoving || pointerMoving) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentScroll = targetScroll;
        smoothedVelocity = 0;
        pointerInfluence = pointerTargetInfluence;
        drawFrame(currentScroll, 0);
        rafId = null;
      }
    };

    const scheduleTick = () => {
      if (motionQuery.matches) {
        drawFrame(targetScroll, 0);
        return;
      }
      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      scheduleTick();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerActive = true;
      targetPointerX = event.clientX;
      targetPointerY = event.clientY;
      scheduleTick();
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      scheduleTick();
    };

    const handleResize = () => {
      resize();
      targetScroll = window.scrollY;
      if (motionQuery.matches) {
        drawFrame(targetScroll, 0);
      } else {
        scheduleTick();
      }
    };

    const handleMotionChange = () => {
      if (motionQuery.matches && rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      pointerActive = false;
      pointerInfluence = 0;
      drawFrame(window.scrollY, 0);
    };

    resize();
    drawFrame(window.scrollY, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      destroyed = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="no-print fixed inset-0 -z-10 pointer-events-none select-none"
    />
  );
}
