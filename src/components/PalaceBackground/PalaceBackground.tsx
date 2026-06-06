import styles from './PalaceBackground.module.css';

interface PalaceBackgroundProps {
  lightsOn?: boolean;
}

const PalaceBackground = ({ lightsOn = false }: PalaceBackgroundProps) => {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Night sky gradient */}
      <div className={styles.sky} />

      {/* Stars */}
      <div className={styles.starsLayer}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className={styles.moonContainer}>
        <div className={styles.moonHalo} />
        <div className={styles.moon}>
          <div className={styles.moonSurface} />
        </div>
      </div>

      {/* Palace SVG */}
      <svg
        className={styles.palace}
        viewBox="0 0 1440 600"
        xmlns="[w3.org](http://www.w3.org/2000/svg)"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="palaceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1008" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0D0D0D" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="windowFilter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ground */}
        <rect x="0" y="570" width="1440" height="30" fill="#0D0D0D" />
        <rect x="0" y="565" width="1440" height="8" fill="#1A1008" opacity="0.5" />

        {/* Far background towers (low opacity for depth) */}
        <g opacity="0.3">
          <rect x="50" y="420" width="40" height="150" fill="url(#palaceGrad)" />
          <path d="M50 420 Q70 390 90 420Z" fill="#1A1008" />

          <rect x="1350" y="420" width="40" height="150" fill="url(#palaceGrad)" />
          <path d="M1350 420 Q1370 390 1390 420Z" fill="#1A1008" />
        </g>

        {/* Main palace base */}
        <rect x="200" y="440" width="1040" height="130" fill="url(#palaceGrad)" />

        {/* Palace entrance arch */}
        <path
          d="M640 570 L640 460 Q720 380 800 460 L800 570Z"
          fill="#0A0A0A"
        />
        <path
          d="M640 460 Q720 370 800 460"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Entrance columns */}
        <rect x="635" y="460" width="12" height="110" fill="#1A1208" />
        <rect x="793" y="460" width="12" height="110" fill="#1A1208" />

        {/* Entry light glow (when lights on) */}
        {lightsOn && (
          <ellipse
            cx="720"
            cy="565"
            rx="60"
            ry="15"
            fill="rgba(255,180,50,0.3)"
          />
        )}

        {/* Left wing */}
        <rect x="200" y="480" width="440" height="90" fill="url(#palaceGrad)" />

        {/* Right wing */}
        <rect x="800" y="480" width="440" height="90" fill="url(#palaceGrad)" />

        {/* Left main tower */}
        <rect x="260" y="340" width="100" height="230" fill="url(#palaceGrad)" />
        <path d="M260 340 Q310 280 360 340Z" fill="#1A1208" />
        {/* Tower onion dome */}
        <ellipse cx="310" cy="295" rx="25" ry="35" fill="#1A1208" />
        <line
          x1="310"
          y1="260"
          x2="310"
          y2="240"
          stroke="#D4AF37"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle cx="310" cy="238" r="4" fill="#D4AF37" opacity="0.8" />

        {/* Right main tower */}
        <rect x="1080" y="340" width="100" height="230" fill="url(#palaceGrad)" />
        <path d="M1080 340 Q1130 280 1180 340Z" fill="#1A1208" />
        {/* Tower onion dome */}
        <ellipse cx="1130" cy="295" rx="25" ry="35" fill="#1A1208" />
        <line
          x1="1130"
          y1="260"
          x2="1130"
          y2="240"
          stroke="#D4AF37"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle cx="1130" cy="238" r="4" fill="#D4AF37" opacity="0.8" />

        {/* Center main dome */}
        <rect x="580" y="360" width="280" height="210" fill="url(#palaceGrad)" />
        {/* Large onion dome */}
        <ellipse cx="720" cy="310" rx="90" ry="110" fill="#1A1208" />
        <ellipse cx="720" cy="235" rx="30" ry="45" fill="#1A1208" />
        <line
          x1="720"
          y1="190"
          x2="720"
          y2="160"
          stroke="#D4AF37"
          strokeWidth="3"
          opacity="0.9"
        />
        <circle cx="720" cy="157" r="8" fill="#D4AF37" opacity="0.9" />
        {/* Dome decorative ring */}
        <ellipse
          cx="720"
          cy="340"
          rx="90"
          ry="12"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Secondary side domes */}
        <ellipse cx="490" cy="410" rx="50" ry="65" fill="#1A1208" />
        <ellipse cx="490" cy="365" rx="18" ry="28" fill="#1A1208" />
        <line x1="490" y1="337" x2="490" y2="320" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
        <circle cx="490" cy="318" r="5" fill="#D4AF37" opacity="0.7" />

        <ellipse cx="950" cy="410" rx="50" ry="65" fill="#1A1208" />
        <ellipse cx="950" cy="365" rx="18" ry="28" fill="#1A1208" />
        <line x1="950" y1="337" x2="950" y2="320" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
        <circle cx="950" cy="318" r="5" fill="#D4AF37" opacity="0.7" />

        {/* Palace windows — left wing */}
        {[320, 380, 440].map((x, i) => (
          <g key={`lw-${i}`}>
            <path
              d={`M${x} 520 L${x} 490 Q${x + 18} 475 ${x + 36} 490 L${x + 36} 520Z`}
              fill={lightsOn ? 'url(#windowGlow)' : '#0A0802'}
              filter={lightsOn ? 'url(#windowFilter)' : undefined}
              opacity={lightsOn ? 0.9 : 0.6}
            />
            {lightsOn && (
              <path
                d={`M${x} 520 L${x} 490 Q${x + 18} 475 ${x + 36} 490 L${x + 36} 520Z`}
                fill="rgba(255,180,60,0.2)"
                filter="url(#glow)"
              />
            )}
          </g>
        ))}

        {/* Palace windows — right wing */}
        {[964, 1024, 1084].map((x, i) => (
          <g key={`rw-${i}`}>
            <path
              d={`M${x} 520 L${x} 490 Q${x + 18} 475 ${x + 36} 490 L${x + 36} 520Z`}
              fill={lightsOn ? 'url(#windowGlow)' : '#0A0802'}
              filter={lightsOn ? 'url(#windowFilter)' : undefined}
              opacity={lightsOn ? 0.9 : 0.6}
            />
          </g>
        ))}

        {/* Center building windows */}
        {[620, 660, 700, 740, 780].map((x, i) => (
          <g key={`cw-${i}`}>
            <path
              d={`M${x} 520 L${x} 490 Q${x + 14} 478 ${x + 28} 490 L${x + 28} 520Z`}
              fill={lightsOn ? 'url(#windowGlow)' : '#0A0802'}
              filter={lightsOn ? 'url(#windowFilter)' : undefined}
              opacity={lightsOn ? 0.9 : 0.6}
            />
          </g>
        ))}

        {/* Upper tower windows */}
        {lightsOn && (
          <>
            <circle cx="310" cy="380" r="12" fill="rgba(255,180,60,0.6)" filter="url(#glow)" />
            <circle cx="1130" cy="380" r="12" fill="rgba(255,180,60,0.6)" filter="url(#glow)" />
            <circle cx="720" cy="400" r="16" fill="rgba(255,180,60,0.5)" filter="url(#glow)" />
          </>
        )}

        {/* Palace decorative crenellations */}
        {Array.from({ length: 26 }).map((_, i) => (
          <rect
            key={`cl-${i}`}
            x={200 + i * 40}
            y="430"
            width="20"
            height="15"
            fill="#1A1208"
            rx="1"
          />
        ))}

        {/* Gold trim lines */}
        <line x1="200" y1="440" x2="1240" y2="440" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
        <line x1="200" y1="480" x2="1240" y2="480" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />

        {/* Reflection / ground glow */}
        {lightsOn && (
          <rect
            x="200"
            y="560"
            width="1040"
            height="10"
            fill="rgba(212, 175, 55, 0.15)"
            filter="url(#glow)"
          />
        )}

        {/* Foreground ground plane */}
        <rect x="0" y="570" width="1440" height="30" fill="#0D0D0D" />
      </svg>

      {/* Ground fog */}
      <div className={styles.fog} />

      {/* Vignette */}
      <div className={styles.vignette} />
    </div>
  );
};

export default PalaceBackground;
