"use client";

import { Box, Typography } from "@mui/material";
import { memo, useMemo } from "react";

// Types for scroll-driven animations
export interface AnimatedMediaProps {
  progress: number; // 0 to 1, driven by scroll
}

// Utility: Linear interpolation
const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t;

// Utility: Clamp
const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

// Utility: Staggered progress - returns progress for item i of n items
const stagger = (progress: number, index: number, total: number, overlap = 0.3): number => {
  const segmentDuration = (1 + overlap * (total - 1)) / total;
  const segmentStart = (index / total) * (1 - overlap);
  const localProgress = (progress - segmentStart) / segmentDuration;
  return clamp(localProgress, 0, 1);
};

// Base styles for media cards
const mediaCardStyle = {
  background: "linear-gradient(135deg, #FDF9F3 0%, #FFFFFF 100%)",
  borderRadius: "16px",
  border: "2px solid #2D2D2D",
  boxShadow: "6px 6px 0px #2D2D2D",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "320px",
  position: "relative",
  overflow: "hidden",
};

// ============================================================
// 1. Neural Network Visualization - Signal propagation
// ============================================================
export const NeuralNetworkMedia = memo(function NeuralNetworkMedia({
  progress,
}: AnimatedMediaProps) {
  const nodes = [
    { x: 50, y: 80, layer: 0 },
    { x: 50, y: 160, layer: 0 },
    { x: 50, y: 240, layer: 0 },
    { x: 150, y: 60, layer: 1 },
    { x: 150, y: 120, layer: 1 },
    { x: 150, y: 180, layer: 1 },
    { x: 150, y: 240, layer: 1 },
    { x: 250, y: 100, layer: 2 },
    { x: 250, y: 180, layer: 2 },
    { x: 350, y: 140, layer: 3 },
  ];

  // Signal travels through layers as scroll progresses
  const activeLayer = Math.floor(progress * 4);

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
          opacity: lerp(0.3, 1, Math.min(progress * 3, 1)),
        }}
      >
        🧠 Rede Neural em Ação
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 400 320"
        sx={{
          width: "100%",
          maxWidth: 350,
          height: "auto",
        }}
      >
        {/* Connections with animated opacity */}
        {nodes.slice(0, 3).map((n1, i) =>
          nodes.slice(3, 7).map((n2, j) => {
            const lineProgress = stagger(progress, 0, 3);
            return (
              <line
                key={`l1-${i}-${j}`}
                x1={n1.x}
                y1={n1.y}
                x2={lerp(n1.x, n2.x, lineProgress)}
                y2={lerp(n1.y, n2.y, lineProgress)}
                stroke="#E85D3A"
                strokeWidth={lerp(0.5, 2, lineProgress)}
                opacity={lerp(0.1, 0.6, lineProgress)}
              />
            );
          })
        )}
        {nodes.slice(3, 7).map((n1, i) =>
          nodes.slice(7, 9).map((n2, j) => {
            const lineProgress = stagger(progress, 1, 3);
            return (
              <line
                key={`l2-${i}-${j}`}
                x1={n1.x}
                y1={n1.y}
                x2={lerp(n1.x, n2.x, lineProgress)}
                y2={lerp(n1.y, n2.y, lineProgress)}
                stroke="#E85D3A"
                strokeWidth={lerp(0.5, 2, lineProgress)}
                opacity={lerp(0.1, 0.6, lineProgress)}
              />
            );
          })
        )}
        {nodes.slice(7, 9).map((n1, i) => {
          const lineProgress = stagger(progress, 2, 3);
          return (
            <line
              key={`l3-${i}`}
              x1={n1.x}
              y1={n1.y}
              x2={lerp(n1.x, nodes[9].x, lineProgress)}
              y2={lerp(n1.y, nodes[9].y, lineProgress)}
              stroke="#E85D3A"
              strokeWidth={lerp(0.5, 2, lineProgress)}
              opacity={lerp(0.1, 0.6, lineProgress)}
            />
          );
        })}

        {/* Nodes with staged activation */}
        {nodes.map((node, i) => {
          const nodeProgress = stagger(progress, node.layer, 4, 0.5);
          const scale = lerp(0.5, 1, nodeProgress);
          const innerScale = lerp(0, 1, nodeProgress);
          
          return (
            <g key={i} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={18 * scale}
                fill="#FDF9F3"
                stroke="#2D2D2D"
                strokeWidth={lerp(1, 2, nodeProgress)}
                opacity={lerp(0.3, 1, nodeProgress)}
              />
              <circle
                r={8 * innerScale}
                fill={node.layer <= activeLayer ? "#E85D3A" : "#ccc"}
                opacity={lerp(0.2, 1, nodeProgress)}
              />
            </g>
          );
        })}

        {/* Layer labels fade in */}
        {[
          { x: 50, label: "Input" },
          { x: 150, label: "Hidden 1" },
          { x: 250, label: "Hidden 2" },
          { x: 350, label: "Output" },
        ].map((layer, i) => (
          <text
            key={i}
            x={layer.x}
            y="290"
            textAnchor="middle"
            fontSize="12"
            fill="#6B6B6B"
            opacity={stagger(progress, i, 4, 0.6)}
          >
            {layer.label}
          </text>
        ))}
      </Box>
    </Box>
  );
});

// ============================================================
// 2. Gradient Descent - Ball rolling down
// ============================================================
export const GradientDescentMedia = memo(function GradientDescentMedia({
  progress,
}: AnimatedMediaProps) {
  // Path points for the loss curve
  const pathPoints = [
    { x: 30, y: 50 },
    { x: 80, y: 200 },
    { x: 150, y: 180 },
    { x: 220, y: 160 },
    { x: 280, y: 220 },
    { x: 320, y: 250 },
    { x: 340, y: 240 },
  ];

  // Ball position interpolated along curve
  const ballIndex = progress * (pathPoints.length - 1);
  const lowerIndex = Math.floor(ballIndex);
  const upperIndex = Math.min(lowerIndex + 1, pathPoints.length - 1);
  const localT = ballIndex - lowerIndex;

  const ballX = lerp(pathPoints[lowerIndex].x, pathPoints[upperIndex].x, localT);
  const ballY = lerp(pathPoints[lowerIndex].y, pathPoints[upperIndex].y, localT);

  // Trail positions (previous ball positions)
  const trailPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5; i++) {
      const trailProgress = Math.max(0, progress - i * 0.08);
      const trailIndex = trailProgress * (pathPoints.length - 1);
      const tLower = Math.floor(trailIndex);
      const tUpper = Math.min(tLower + 1, pathPoints.length - 1);
      const tLocal = trailIndex - tLower;
      positions.push({
        x: lerp(pathPoints[tLower].x, pathPoints[tUpper].x, tLocal),
        y: lerp(pathPoints[tLower].y, pathPoints[tUpper].y, tLocal),
        opacity: 0.3 - i * 0.05,
      });
    }
    return positions;
  }, [progress, pathPoints]);

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        📉 Descida do Gradiente
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 350 280"
        sx={{ width: "100%", maxWidth: 320, height: "auto" }}
      >
        {/* Loss curve - draws as progress increases */}
        <path
          d="M 30 50 Q 80 200 150 180 Q 220 160 280 220 Q 320 250 340 240"
          fill="none"
          stroke="#E85D3A"
          strokeWidth="3"
          strokeDasharray="500"
          strokeDashoffset={lerp(500, 0, Math.min(progress * 1.5, 1))}
        />

        {/* Trail balls */}
        {trailPositions.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={10 - i * 1.5}
            fill="#2D2D2D"
            opacity={pos.opacity}
          />
        ))}

        {/* Main ball */}
        <circle
          cx={ballX}
          cy={ballY}
          r="12"
          fill="#2D2D2D"
          stroke="#E85D3A"
          strokeWidth="2"
        />

        {/* Axis - fade in */}
        <g opacity={Math.min(progress * 2, 1)}>
          <line x1="20" y1="260" x2="340" y2="260" stroke="#2D2D2D" strokeWidth="2" />
          <line x1="20" y1="260" x2="20" y2="30" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="278" textAnchor="middle" fontSize="12" fill="#6B6B6B">
            Parâmetros
          </text>
          <text
            x="15"
            y="145"
            textAnchor="middle"
            fontSize="12"
            fill="#6B6B6B"
            transform="rotate(-90, 15, 145)"
          >
            Loss
          </text>
        </g>
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: "text.secondary",
          textAlign: "center",
          fontSize: "0.85rem",
          opacity: progress,
        }}
      >
        A bolinha &ldquo;desce&rdquo; em direção ao mínimo
      </Typography>
    </Box>
  );
});

// ============================================================
// 3. Decision Tree - Nodes appear progressively
// ============================================================
export const DecisionTreeMedia = memo(function DecisionTreeMedia({
  progress,
}: AnimatedMediaProps) {
  const levels = [
    { progress: stagger(progress, 0, 4), opacity: 1 },
    { progress: stagger(progress, 1, 4), opacity: 1 },
    { progress: stagger(progress, 2, 4), opacity: 1 },
    { progress: stagger(progress, 3, 4), opacity: 1 },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🌳 Árvore de Decisão
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 360 300"
        sx={{ width: "100%", maxWidth: 340, height: "auto" }}
      >
        {/* Connections - grow with progress */}
        <line
          x1="180"
          y1="50"
          x2={lerp(180, 90, levels[1].progress)}
          y2={lerp(50, 120, levels[1].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[0].progress}
        />
        <line
          x1="180"
          y1="50"
          x2={lerp(180, 270, levels[1].progress)}
          y2={lerp(50, 120, levels[1].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[0].progress}
        />
        <line
          x1="90"
          y1="140"
          x2={lerp(90, 50, levels[2].progress)}
          y2={lerp(140, 210, levels[2].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[1].progress}
        />
        <line
          x1="90"
          y1="140"
          x2={lerp(90, 130, levels[2].progress)}
          y2={lerp(140, 210, levels[2].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[1].progress}
        />
        <line
          x1="270"
          y1="140"
          x2={lerp(270, 230, levels[2].progress)}
          y2={lerp(140, 210, levels[2].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[1].progress}
        />
        <line
          x1="270"
          y1="140"
          x2={lerp(270, 310, levels[2].progress)}
          y2={lerp(140, 210, levels[2].progress)}
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={levels[1].progress}
        />

        {/* Root node */}
        <g opacity={levels[0].progress} transform={`scale(${lerp(0.5, 1, levels[0].progress)})`} style={{ transformOrigin: "180px 45px" }}>
          <rect x="130" y="25" width="100" height="40" rx="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="52" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">
            Idade {">"} 30?
          </text>
        </g>

        {/* Level 1 nodes */}
        <g opacity={levels[1].progress}>
          <rect x="40" y="105" width="100" height="40" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
          <text x="90" y="132" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
            Renda {">"} 50k?
          </text>
          <rect x="220" y="105" width="100" height="40" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
          <text x="270" y="132" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
            Casado?
          </text>
        </g>

        {/* Leaf nodes */}
        <g opacity={levels[2].progress}>
          <rect x="10" y="200" width="80" height="35" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
          <text x="50" y="223" textAnchor="middle" fontSize="11" fill="white">✓ Aprovar</text>
          <rect x="90" y="200" width="80" height="35" rx="8" fill="#f44336" stroke="#2D2D2D" strokeWidth="2" />
          <text x="130" y="223" textAnchor="middle" fontSize="11" fill="white">✗ Rejeitar</text>
          <rect x="190" y="200" width="80" height="35" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
          <text x="230" y="223" textAnchor="middle" fontSize="11" fill="white">✓ Aprovar</text>
          <rect x="270" y="200" width="80" height="35" rx="8" fill="#f44336" stroke="#2D2D2D" strokeWidth="2" />
          <text x="310" y="223" textAnchor="middle" fontSize="11" fill="white">✗ Rejeitar</text>
        </g>

        {/* Edge labels */}
        <text x="120" y="80" fontSize="10" fill="#4CAF50" fontWeight="bold" opacity={levels[1].progress}>
          Sim
        </text>
        <text x="225" y="80" fontSize="10" fill="#f44336" fontWeight="bold" opacity={levels[1].progress}>
          Não
        </text>
      </Box>
    </Box>
  );
});

// ============================================================
// 4. Confusion Matrix - Cells fill with values
// ============================================================
export const ConfusionMatrixMedia = memo(function ConfusionMatrixMedia({
  progress,
}: AnimatedMediaProps) {
  const cells = [
    { value: 85, label: "VP", color: "#4CAF50", row: 0, col: 0 },
    { value: 5, label: "FP", color: "#f44336", row: 0, col: 1 },
    { value: 10, label: "FN", color: "#FF9800", row: 1, col: 0 },
    { value: 100, label: "VN", color: "#4CAF50", row: 1, col: 1 },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🎯 Matriz de Confusão
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr",
          gridTemplateRows: "auto 1fr 1fr",
          gap: "4px",
          maxWidth: 280,
        }}
      >
        {/* Header */}
        <Box sx={{ gridColumn: "1", gridRow: "1" }} />
        <Box
          sx={{
            gridColumn: "2 / 4",
            textAlign: "center",
            py: 0.5,
            color: "primary.dark",
            fontWeight: 600,
            fontSize: "0.85rem",
            opacity: Math.min(progress * 3, 1),
          }}
        >
          Predito
        </Box>
        <Box
          sx={{
            gridColumn: "1",
            gridRow: "2 / 4",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textAlign: "center",
            px: 0.5,
            color: "primary.dark",
            fontWeight: 600,
            fontSize: "0.85rem",
            opacity: Math.min(progress * 3, 1),
          }}
        >
          Real
        </Box>

        {/* Cells */}
        {cells.map((cell, i) => {
          const cellProgress = stagger(progress, i, 4, 0.4);
          const displayValue = Math.round(lerp(0, cell.value, cellProgress));

          return (
            <Box
              key={i}
              sx={{
                gridColumn: cell.col + 2,
                gridRow: cell.row + 2,
                bgcolor: cell.color,
                color: "white",
                p: 2,
                textAlign: "center",
                borderRadius:
                  cell.row === 0 && cell.col === 0
                    ? "8px 0 0 0"
                    : cell.row === 0 && cell.col === 1
                      ? "0 8px 0 0"
                      : cell.row === 1 && cell.col === 0
                        ? "0 0 0 8px"
                        : "0 0 8px 0",
                border: "2px solid #2D2D2D",
                transform: `scale(${lerp(0.8, 1, cellProgress)})`,
                opacity: cellProgress,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {displayValue}
              </Typography>
              <Typography variant="caption">{cell.label}</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: "text.secondary",
          textAlign: "center",
          fontSize: "0.85rem",
          opacity: progress,
        }}
      >
        Acurácia: {(92.5 * progress).toFixed(1)}%
      </Typography>
    </Box>
  );
});

// ============================================================
// 5. Loss Chart - Lines draw progressively
// ============================================================
export const LossChartMedia = memo(function LossChartMedia({
  progress,
}: AnimatedMediaProps) {
  const points = [
    { x: 30, y: 40 },
    { x: 60, y: 80 },
    { x: 90, y: 60 },
    { x: 120, y: 100 },
    { x: 150, y: 85 },
    { x: 180, y: 120 },
    { x: 210, y: 110 },
    { x: 240, y: 140 },
    { x: 270, y: 135 },
    { x: 300, y: 160 },
  ];

  // Number of points to show based on progress
  const visiblePoints = Math.ceil(points.length * progress);
  const visiblePath = points
    .slice(0, visiblePoints)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${200 - p.y}`)
    .join(" ");

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        📊 Treinamento do Modelo
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 340 220"
        sx={{ width: "100%", maxWidth: 320, height: "auto" }}
      >
        {/* Grid lines */}
        {[50, 100, 150].map((y) => (
          <line
            key={y}
            x1="25"
            y1={200 - y}
            x2="320"
            y2={200 - y}
            stroke="#E0E0E0"
            strokeWidth="1"
            strokeDasharray="4"
            opacity={Math.min(progress * 2, 1)}
          />
        ))}

        {/* Training loss line */}
        <path
          d={visiblePath}
          fill="none"
          stroke="#E85D3A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Validation loss (slightly offset) */}
        <path
          d={points
            .slice(0, visiblePoints)
            .map(
              (p, i) =>
                `${i === 0 ? "M" : "L"} ${p.x} ${200 - p.y + 15 + Math.sin(i) * 5}`
            )
            .join(" ")}
          fill="none"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5,5"
          opacity="0.6"
        />

        {/* Data points */}
        {points.slice(0, visiblePoints).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={200 - p.y}
            r="5"
            fill="#E85D3A"
            stroke="#2D2D2D"
            strokeWidth="1.5"
            opacity={i === visiblePoints - 1 ? 1 : 0.7}
          />
        ))}

        {/* Axis */}
        <line
          x1="25"
          y1="200"
          x2="320"
          y2="200"
          stroke="#2D2D2D"
          strokeWidth="2"
        />
        <line x1="25" y1="200" x2="25" y2="30" stroke="#2D2D2D" strokeWidth="2" />

        {/* Labels */}
        <text
          x="170"
          y="218"
          textAnchor="middle"
          fontSize="11"
          fill="#6B6B6B"
          opacity={Math.min(progress * 2, 1)}
        >
          Épocas
        </text>
        <text
          x="15"
          y="115"
          textAnchor="middle"
          fontSize="11"
          fill="#6B6B6B"
          transform="rotate(-90, 15, 115)"
          opacity={Math.min(progress * 2, 1)}
        >
          Acurácia
        </text>

        {/* Legend */}
        <g opacity={progress}>
          <rect
            x="230"
            y="15"
            width="100"
            height="45"
            rx="6"
            fill="white"
            stroke="#E0E0E0"
          />
          <line x1="240" y1="30" x2="260" y2="30" stroke="#E85D3A" strokeWidth="2" />
          <text x="265" y="33" fontSize="10" fill="#6B6B6B">
            Treino
          </text>
          <line
            x1="240"
            y1="48"
            x2="260"
            y2="48"
            stroke="#2D2D2D"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          <text x="265" y="51" fontSize="10" fill="#6B6B6B">
            Validação
          </text>
        </g>
      </Box>
    </Box>
  );
});

// ============================================================
// 6. Data Flow - Pipeline steps appear in sequence
// ============================================================
export const DataFlowMedia = memo(function DataFlowMedia({
  progress,
}: AnimatedMediaProps) {
  const steps = [
    { icon: "📥", label: "Coleta" },
    { icon: "🧹", label: "Limpeza" },
    { icon: "🔧", label: "Transform" },
    { icon: "🎯", label: "Modelo" },
    { icon: "📊", label: "Output" },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🔄 Pipeline de Dados
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {steps.map((step, i) => {
          const stepProgress = stagger(progress, i, steps.length, 0.3);
          const isActive = progress > i / steps.length;

          return (
            <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: isActive ? "secondary.main" : "background.paper",
                  color: isActive ? "white" : "text.primary",
                  borderRadius: 2,
                  border: "2px solid #2D2D2D",
                  boxShadow: "3px 3px 0px #2D2D2D",
                  minWidth: 70,
                  transform: `scale(${lerp(0.7, 1, stepProgress)}) translateY(${lerp(20, 0, stepProgress)}px)`,
                  opacity: stepProgress,
                  transition: "background-color 0.2s",
                }}
              >
                <Box sx={{ fontSize: "1.5rem" }}>{step.icon}</Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                >
                  {step.label}
                </Typography>
              </Box>
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    mx: 0.5,
                    color: "secondary.main",
                    fontWeight: "bold",
                    opacity: stagger(progress, i + 0.5, steps.length),
                    transform: `scale(${lerp(0, 1, stagger(progress, i + 0.5, steps.length))})`,
                  }}
                >
                  →
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

// ============================================================
// 7. Transformer Architecture - Layers build up
// ============================================================
export const TransformerMedia = memo(function TransformerMedia({
  progress,
}: AnimatedMediaProps) {
  const layers = [
    { progress: stagger(progress, 0, 4), y: 290 },
    { progress: stagger(progress, 1, 4), y: 220 },
    { progress: stagger(progress, 2, 4), y: 140 },
    { progress: stagger(progress, 3, 4), y: 60 },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🤖 Arquitetura Transformer
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 360 340"
        sx={{ width: "100%", maxWidth: 340, height: "auto" }}
      >
        {/* Input Embedding */}
        <g opacity={layers[0].progress} transform={`translate(0, ${lerp(30, 0, layers[0].progress)})`}>
          <rect x="130" y="290" width="100" height="35" rx="6" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="312" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
            Input Embed
          </text>
        </g>

        {/* Multi-Head Attention */}
        <g opacity={layers[1].progress} transform={`translate(0, ${lerp(30, 0, layers[1].progress)})`}>
          <rect x="130" y="220" width="100" height="50" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="240" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
            Multi-Head
          </text>
          <text x="180" y="255" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
            Attention
          </text>
        </g>

        {/* Feed Forward */}
        <g opacity={layers[2].progress} transform={`translate(0, ${lerp(30, 0, layers[2].progress)})`}>
          <rect x="130" y="140" width="100" height="50" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="160" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
            Feed
          </text>
          <text x="180" y="175" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
            Forward
          </text>
        </g>

        {/* Output */}
        <g opacity={layers[3].progress} transform={`translate(0, ${lerp(30, 0, layers[3].progress)})`}>
          <rect x="130" y="60" width="100" height="35" rx="6" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="2" />
          <text x="180" y="82" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
            Output
          </text>
        </g>

        {/* Arrows */}
        <line
          x1="180"
          y1="290"
          x2="180"
          y2="275"
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={layers[0].progress}
          markerEnd="url(#arrowT)"
        />
        <line
          x1="180"
          y1="220"
          x2="180"
          y2="195"
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={layers[1].progress}
          markerEnd="url(#arrowT)"
        />
        <line
          x1="180"
          y1="140"
          x2="180"
          y2="100"
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={layers[2].progress}
          markerEnd="url(#arrowT)"
        />

        {/* Skip Connections */}
        <path
          d="M 125 245 Q 80 245 80 170 Q 80 165 125 165"
          fill="none"
          stroke="#6B6B6B"
          strokeWidth="1.5"
          strokeDasharray="4"
          opacity={Math.min(layers[1].progress, layers[2].progress)}
          markerEnd="url(#arrowT)"
        />

        {/* N× indicator */}
        <text
          x="255"
          y="180"
          fontSize="14"
          fill="#E85D3A"
          fontWeight="bold"
          opacity={layers[2].progress}
        >
          N×
        </text>

        <defs>
          <marker id="arrowT" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
});

// ============================================================
// 8. Self-Attention - Lines thickness varies with progress
// ============================================================
export const AttentionMedia = memo(function AttentionMedia({
  progress,
}: AnimatedMediaProps) {
  const words = ["O", "gato", "sentou", "no", "tapete"];
  
  // Attention weights for "gato" (index 1) attending to others
  const attentionWeights = [0.3, 1.0, 0.5, 0.7, 0.6];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        👀 Self-Attention
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 320 260"
        sx={{ width: "100%", maxWidth: 300, height: "auto" }}
      >
        {/* Words on left */}
        {words.map((word, i) => {
          const wordProgress = stagger(progress, i, words.length, 0.5);
          return (
            <g key={`left-${i}`} opacity={wordProgress}>
              <rect
                x="20"
                y={40 + i * 45}
                width="60"
                height="30"
                rx="6"
                fill={i === 1 ? "#FFE0B2" : "#FDF9F3"}
                stroke="#2D2D2D"
                strokeWidth="1.5"
              />
              <text
                x="50"
                y={60 + i * 45}
                textAnchor="middle"
                fontSize="11"
                fill="#2D2D2D"
                fontWeight="600"
              >
                {word}
              </text>
            </g>
          );
        })}

        {/* Words on right */}
        {words.map((word, i) => {
          const wordProgress = stagger(progress, i, words.length, 0.5);
          return (
            <g key={`right-${i}`} opacity={wordProgress}>
              <rect
                x="240"
                y={40 + i * 45}
                width="60"
                height="30"
                rx="6"
                fill="#FDF9F3"
                stroke="#2D2D2D"
                strokeWidth="1.5"
              />
              <text
                x="270"
                y={60 + i * 45}
                textAnchor="middle"
                fontSize="11"
                fill="#2D2D2D"
                fontWeight="600"
              >
                {word}
              </text>
            </g>
          );
        })}

        {/* Attention lines - animate from "gato" to others */}
        {words.map((_, i) => {
          const lineProgress = stagger(progress, 0.3 + i * 0.1, 1.2);
          const weight = attentionWeights[i];
          const strokeWidth = lerp(0, weight * 4, lineProgress);
          
          return (
            <line
              key={`attention-${i}`}
              x1="80"
              y1="100"
              x2={lerp(80, 240, lineProgress)}
              y2={lerp(100, 55 + i * 45, lineProgress)}
              stroke="#E85D3A"
              strokeWidth={strokeWidth}
              opacity={lerp(0.2, weight, lineProgress)}
            />
          );
        })}
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: "text.secondary",
          textAlign: "center",
          fontSize: "0.8rem",
          opacity: progress,
        }}
      >
        Linhas mais grossas = maior atenção
      </Typography>
    </Box>
  );
});

// ============================================================
// 9. CNN Convolution - Kernel slides across input
// ============================================================
export const ConvolutionMedia = memo(function ConvolutionMedia({
  progress,
}: AnimatedMediaProps) {
  // Kernel position (slides from position 0 to 4)
  const kernelPos = Math.floor(progress * 9);
  const kernelRow = Math.floor(kernelPos / 3);
  const kernelCol = kernelPos % 3;

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🔍 Operação de Convolução
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 360 240"
        sx={{ width: "100%", maxWidth: 340, height: "auto" }}
      >
        {/* Input Image Grid */}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => {
            const isInKernel =
              row >= kernelRow &&
              row < kernelRow + 3 &&
              col >= kernelCol &&
              col < kernelCol + 3;
            return (
              <rect
                key={`input-${row}-${col}`}
                x={20 + col * 28}
                y={30 + row * 28}
                width="26"
                height="26"
                fill={isInKernel ? "#FF7F5C" : "#FDF9F3"}
                stroke="#2D2D2D"
                strokeWidth={isInKernel ? 2 : 1}
                rx="2"
              />
            );
          })
        )}

        {/* Kernel overlay */}
        <rect
          x={20 + kernelCol * 28 - 2}
          y={30 + kernelRow * 28 - 2}
          width={26 * 3 + 6}
          height={26 * 3 + 6}
          fill="none"
          stroke="#E85D3A"
          strokeWidth="3"
          rx="4"
        />

        {/* Arrow */}
        <path
          d="M 175 100 L 195 100"
          stroke="#2D2D2D"
          strokeWidth="2"
          markerEnd="url(#arrowC)"
          opacity={Math.min(progress * 2, 1)}
        />
        <text x="185" y="115" fontSize="14" fill="#E85D3A" textAnchor="middle">
          ×
        </text>

        {/* Kernel */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`kernel-${row}-${col}`}
              x={210 + col * 24}
              y={60 + row * 24}
              width="22"
              height="22"
              fill="#E85D3A"
              stroke="#2D2D2D"
              strokeWidth="1.5"
              rx="2"
              opacity={Math.min(progress * 2, 1)}
            />
          ))
        )}

        {/* Output */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const outputIndex = row * 3 + col;
            const isComputed = outputIndex <= kernelPos;
            return (
              <rect
                key={`output-${row}-${col}`}
                x={300 + col * 20}
                y={55 + row * 20}
                width="18"
                height="18"
                fill={isComputed ? "#4CAF50" : "#FDF9F3"}
                stroke="#2D2D2D"
                strokeWidth="1"
                rx="2"
                opacity={isComputed ? 1 : 0.4}
              />
            );
          })
        )}

        {/* Labels */}
        <text
          x="90"
          y="200"
          textAnchor="middle"
          fontSize="11"
          fill="#6B6B6B"
          opacity={Math.min(progress * 3, 1)}
        >
          Input 5×5
        </text>
        <text
          x="243"
          y="160"
          textAnchor="middle"
          fontSize="11"
          fill="#6B6B6B"
          opacity={Math.min(progress * 3, 1)}
        >
          Kernel 3×3
        </text>
        <text
          x="329"
          y="135"
          textAnchor="middle"
          fontSize="11"
          fill="#6B6B6B"
          opacity={progress}
        >
          Output
        </text>

        <defs>
          <marker id="arrowC" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
});

// ============================================================
// 10. CNN Architecture - Layers shrink progressively
// ============================================================
export const CNNArchitectureMedia = memo(function CNNArchitectureMedia({
  progress,
}: AnimatedMediaProps) {
  const stages = [
    { type: "input", progress: stagger(progress, 0, 6), icon: "🐱" },
    { type: "conv", progress: stagger(progress, 1, 6), layers: 1 },
    { type: "conv", progress: stagger(progress, 2, 6), layers: 2 },
    { type: "conv", progress: stagger(progress, 3, 6), layers: 3 },
    { type: "fc", progress: stagger(progress, 4, 6) },
    { type: "output", progress: stagger(progress, 5, 6) },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🖼️ Arquitetura CNN
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Input Image */}
        <Box
          sx={{
            width: 50,
            height: 50,
            bgcolor: "#E85D3A",
            border: "2px solid #2D2D2D",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            opacity: stages[0].progress,
            transform: `scale(${lerp(0.5, 1, stages[0].progress)})`,
          }}
        >
          🐱
        </Box>

        <Box sx={{ color: "text.secondary", mx: 0.5, opacity: stages[0].progress }}>
          →
        </Box>

        {/* Conv layers */}
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: stages[i].progress,
              transform: `scale(${lerp(0.5, 1, stages[i].progress)})`,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: lerp(20, 50 - i * 8, stages[i].progress),
                bgcolor: "#FF7F5C",
                border: "2px solid #2D2D2D",
                borderRadius: 1,
                mb: 0.5,
              }}
            />
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
              Conv{i}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            color: "text.secondary",
            mx: 0.5,
            opacity: stages[3].progress,
          }}
        >
          →
        </Box>

        {/* Flatten */}
        <Box
          sx={{
            width: 15,
            height: lerp(10, 60, stages[4].progress),
            bgcolor: "#4CAF50",
            border: "2px solid #2D2D2D",
            borderRadius: 1,
            opacity: stages[4].progress,
          }}
        />

        <Box
          sx={{
            color: "text.secondary",
            mx: 0.5,
            opacity: stages[4].progress,
          }}
        >
          →
        </Box>

        {/* FC layers */}
        {[1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: stages[4].progress,
              transform: `scale(${lerp(0.5, 1, stages[4].progress)})`,
            }}
          >
            <Box
              sx={{
                width: 25,
                height: 35,
                bgcolor: "#2196F3",
                border: "2px solid #2D2D2D",
                borderRadius: 1,
                mb: 0.5,
              }}
            />
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
              FC{i}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            color: "text.secondary",
            mx: 0.5,
            opacity: stages[5].progress,
          }}
        >
          →
        </Box>

        {/* Output */}
        <Box
          sx={{
            p: 1,
            bgcolor: "#4CAF50",
            border: "2px solid #2D2D2D",
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "white",
            opacity: stages[5].progress,
            transform: `scale(${lerp(0.5, 1, stages[5].progress)})`,
          }}
        >
          Gato ✓
        </Box>
      </Box>
    </Box>
  );
});

// ============================================================
// 11. Pooling Operation - Values reduce
// ============================================================
export const PoolingMedia = memo(function PoolingMedia({
  progress,
}: AnimatedMediaProps) {
  const inputGrid = [
    [1, 3, 2, 1],
    [4, 6, 5, 2],
    [7, 2, 1, 3],
    [2, 5, 4, 1],
  ];
  const outputGrid = [
    [6, 5],
    [7, 4],
  ];

  // Highlight the current 2x2 region being pooled
  const poolStep = Math.floor(progress * 4);
  const poolRow = Math.floor(poolStep / 2);
  const poolCol = poolStep % 2;

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        📉 Max Pooling 2×2
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 320 200"
        sx={{ width: "100%", maxWidth: 300, height: "auto" }}
      >
        {/* Input 4x4 */}
        {inputGrid.map((row, i) =>
          row.map((val, j) => {
            const isInPool =
              i >= poolRow * 2 &&
              i < poolRow * 2 + 2 &&
              j >= poolCol * 2 &&
              j < poolCol * 2 + 2;
            const isMax =
              isInPool &&
              val === outputGrid[poolRow]?.[poolCol];

            return (
              <g key={`in-${i}-${j}`}>
                <rect
                  x={30 + j * 40}
                  y={30 + i * 40}
                  width="38"
                  height="38"
                  fill={
                    isMax
                      ? "#4CAF50"
                      : isInPool
                        ? "#FFE0B2"
                        : "#FDF9F3"
                  }
                  stroke={isInPool ? "#E85D3A" : "#2D2D2D"}
                  strokeWidth={isInPool ? 2 : 1}
                />
                <text
                  x={49 + j * 40}
                  y={55 + i * 40}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#2D2D2D"
                  fontWeight={isMax ? "bold" : "normal"}
                >
                  {val}
                </text>
              </g>
            );
          })
        )}

        {/* Arrow */}
        <path
          d="M 200 100 L 230 100"
          stroke="#2D2D2D"
          strokeWidth="2"
          markerEnd="url(#arrowP)"
          opacity={Math.min(progress * 2, 1)}
        />
        <text
          x="215"
          y="90"
          fontSize="12"
          fill="#6B6B6B"
          opacity={Math.min(progress * 2, 1)}
        >
          max
        </text>

        {/* Output 2x2 */}
        {outputGrid.map((row, i) =>
          row.map((val, j) => {
            const outputIndex = i * 2 + j;
            const isComputed = outputIndex <= poolStep;

            return (
              <g key={`out-${i}-${j}`}>
                <rect
                  x={240 + j * 40}
                  y={50 + i * 40}
                  width="38"
                  height="38"
                  fill={isComputed ? "#4CAF50" : "#FDF9F3"}
                  stroke="#2D2D2D"
                  strokeWidth={isComputed ? 2 : 1}
                  opacity={isComputed ? 1 : 0.4}
                />
                <text
                  x={259 + j * 40}
                  y={75 + i * 40}
                  textAnchor="middle"
                  fontSize="16"
                  fill={isComputed ? "white" : "#2D2D2D"}
                  fontWeight="bold"
                  opacity={isComputed ? 1 : 0.4}
                >
                  {isComputed ? val : "?"}
                </text>
              </g>
            );
          })
        )}

        <defs>
          <marker id="arrowP" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
});

// ============================================================
// 12. Transfer Learning - Layers freeze/unfreeze
// ============================================================
export const TransferLearningMedia = memo(function TransferLearningMedia({
  progress,
}: AnimatedMediaProps) {
  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🔄 Transfer Learning
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        {/* Pre-trained model */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 0.3 }}>
            {[1, 2, 3, 4].map((i) => {
              const layerProgress = stagger(progress, i - 1, 5, 0.4);
              // Layers stay frozen (blue) initially, then last one lights up
              const isFrozen = i < 4 || progress < 0.7;

              return (
                <Box
                  key={i}
                  sx={{
                    width: 30,
                    height: lerp(20, 40, layerProgress),
                    bgcolor: isFrozen ? "#4CAF50" : "#E85D3A",
                    border: "2px solid #2D2D2D",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    color: "white",
                    opacity: layerProgress,
                    transform: `scale(${lerp(0.5, 1, layerProgress)})`,
                  }}
                >
                  {isFrozen ? "❄️" : "🔥"}
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              width: 50,
              height: lerp(20, 40, stagger(progress, 4, 5)),
              bgcolor: "#E85D3A",
              border: "2px solid #2D2D2D",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              color: "white",
              fontWeight: 600,
              opacity: stagger(progress, 4, 5),
              transform: `scale(${lerp(0.5, 1, stagger(progress, 4, 5))})`,
            }}
          >
            🔥 Novo
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            color: "text.secondary",
            textAlign: "center",
            opacity: Math.min(progress * 2, 1),
          }}
        >
          ❄️ Camadas congeladas (ImageNet)
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            color: "text.secondary",
            textAlign: "center",
            opacity: progress,
          }}
        >
          🔥 Camada treinável (seu problema)
        </Typography>
      </Box>
    </Box>
  );
});

// ============================================================
// 13. Overfitting - Curves diverge with progress
// ============================================================
export const OverfittingMedia = memo(function OverfittingMedia({
  progress,
}: AnimatedMediaProps) {
  // Data points
  const dataPoints = [
    { x: 20, y: 70 },
    { x: 30, y: 40 },
    { x: 50, y: 55 },
    { x: 70, y: 30 },
    { x: 85, y: 60 },
  ];

  // Different fit lines based on progress
  // Start with underfitting (straight line), end with overfitting (wiggly)

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        📊 Overfitting vs Underfitting
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {/* Underfitting */}
        <Box
          sx={{
            textAlign: "center",
            opacity: stagger(progress, 0, 3),
            transform: `scale(${lerp(0.8, 1, stagger(progress, 0, 3))})`,
          }}
        >
          <Box component="svg" viewBox="0 0 100 100" sx={{ width: 80, height: 80 }}>
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#E85D3A" />
            ))}
            <line
              x1="10"
              y1="60"
              x2="90"
              y2="50"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeDasharray={`${100 * stagger(progress, 0, 3)}`}
            />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
            Underfitting
          </Typography>
        </Box>

        {/* Good fit */}
        <Box
          sx={{
            textAlign: "center",
            opacity: stagger(progress, 1, 3),
            transform: `scale(${lerp(0.8, 1, stagger(progress, 1, 3))})`,
          }}
        >
          <Box component="svg" viewBox="0 0 100 100" sx={{ width: 80, height: 80 }}>
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#4CAF50" />
            ))}
            <path
              d="M 15 75 Q 30 35 50 55 Q 70 25 90 55"
              fill="none"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeDasharray={`${150 * stagger(progress, 1, 3)}`}
            />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "#4CAF50", fontWeight: 600 }}>
            Bom ajuste ✓
          </Typography>
        </Box>

        {/* Overfitting */}
        <Box
          sx={{
            textAlign: "center",
            opacity: stagger(progress, 2, 3),
            transform: `scale(${lerp(0.8, 1, stagger(progress, 2, 3))})`,
          }}
        >
          <Box component="svg" viewBox="0 0 100 100" sx={{ width: 80, height: 80 }}>
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#f44336" />
            ))}
            <path
              d="M 15 70 Q 18 70 20 70 Q 25 70 28 40 Q 32 40 38 50 Q 45 55 50 55 Q 55 55 62 40 Q 68 30 70 30 Q 75 30 80 50 Q 83 60 85 60 Q 88 60 90 55"
              fill="none"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeDasharray={`${250 * stagger(progress, 2, 3)}`}
            />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "#f44336" }}>
            Overfitting
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

// ============================================================
// 14. RAG Pipeline - Data flows through system
// ============================================================
export const RAGPipelineMedia = memo(function RAGPipelineMedia({
  progress,
}: AnimatedMediaProps) {
  const steps = [
    { x: 10, y: 90, w: 80, h: 40, label: "❓ Query", color: "#E85D3A" },
    { x: 120, y: 30, w: 80, h: 50, label: "📚 Vector\nDB", color: "#4CAF50" },
    { x: 120, y: 140, w: 80, h: 50, label: "📄 Docs", color: "#FF7F5C" },
    { x: 230, y: 90, w: 60, h: 40, label: "🤖 LLM", color: "#2196F3" },
    { x: 310, y: 90, w: 35, h: 40, label: "💬", color: "#9C27B0" },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🔍 Pipeline RAG
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 350 220"
        sx={{ width: "100%", maxWidth: 330, height: "auto" }}
      >
        {/* Steps appear progressively */}
        {steps.map((step, i) => {
          const stepProgress = stagger(progress, i, steps.length, 0.4);
          return (
            <g
              key={i}
              opacity={stepProgress}
              transform={`translate(${lerp(-20, 0, stepProgress)}, 0)`}
            >
              <rect
                x={step.x}
                y={step.y}
                width={step.w}
                height={step.h}
                rx="8"
                fill={step.color}
                stroke="#2D2D2D"
                strokeWidth="2"
              />
              {step.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={step.x + step.w / 2}
                  y={step.y + step.h / 2 + (li - 0.5) * 12 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Animated flow lines */}
        <path
          d="M 90 100 L 118 60"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeDasharray={`${50 * stagger(progress, 0.5, 2)}`}
          markerEnd="url(#arrowR)"
          opacity={stagger(progress, 0.5, 2)}
        />
        <path
          d="M 160 80 L 160 138"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeDasharray={`${60 * stagger(progress, 1, 2)}`}
          markerEnd="url(#arrowR)"
          opacity={stagger(progress, 1, 2)}
        />
        <path
          d="M 200 165 L 230 125"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeDasharray={`${50 * stagger(progress, 1.5, 2)}`}
          markerEnd="url(#arrowR)"
          opacity={stagger(progress, 1.5, 2)}
        />
        <path
          d="M 290 110 L 308 110"
          stroke="#2D2D2D"
          strokeWidth="2"
          markerEnd="url(#arrowR)"
          opacity={progress}
        />

        <defs>
          <marker id="arrowR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
});

// ============================================================
// 15. Embedding Space - Points cluster as progress increases
// ============================================================
export const EmbeddingSpaceMedia = memo(function EmbeddingSpaceMedia({
  progress,
}: AnimatedMediaProps) {
  // Start scattered, end clustered
  const clusters = [
    {
      name: "🐱 Animais",
      color: "#E85D3A",
      targetX: 80,
      targetY: 70,
      points: [
        { sx: 150, sy: 80 },
        { sx: 100, sy: 150 },
        { sx: 200, sy: 100 },
      ],
    },
    {
      name: "🚗 Veículos",
      color: "#4CAF50",
      targetX: 220,
      targetY: 60,
      points: [
        { sx: 180, sy: 180 },
        { sx: 250, sy: 120 },
        { sx: 140, sy: 50 },
      ],
    },
    {
      name: "🍕 Comida",
      color: "#2196F3",
      targetX: 145,
      targetY: 160,
      points: [
        { sx: 80, sy: 180 },
        { sx: 230, sy: 160 },
        { sx: 120, sy: 90 },
      ],
    },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🌐 Espaço de Embeddings
      </Typography>
      <Box
        component="svg"
        viewBox="0 0 300 240"
        sx={{ width: "100%", maxWidth: 280, height: "auto" }}
      >
        {/* Axes */}
        <line
          x1="40"
          y1="200"
          x2="280"
          y2="200"
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={Math.min(progress * 2, 1)}
        />
        <line
          x1="40"
          y1="200"
          x2="40"
          y2="20"
          stroke="#2D2D2D"
          strokeWidth="2"
          opacity={Math.min(progress * 2, 1)}
        />

        {/* Cluster points */}
        {clusters.map((cluster, ci) =>
          cluster.points.map((p, pi) => {
            const x = lerp(p.sx, cluster.targetX + (pi - 1) * 15, progress);
            const y = lerp(p.sy, cluster.targetY + (pi - 1) * 15, progress);
            return (
              <circle
                key={`${ci}-${pi}`}
                cx={x}
                cy={y}
                r="8"
                fill={cluster.color}
                stroke="#2D2D2D"
                strokeWidth="1.5"
                opacity={stagger(progress, ci * 3 + pi, 9, 0.6)}
              />
            );
          })
        )}

        {/* Cluster labels */}
        {clusters.map((cluster, ci) => (
          <text
            key={ci}
            x={cluster.targetX}
            y={cluster.targetY + 40}
            textAnchor="middle"
            fontSize="9"
            fill="#6B6B6B"
            opacity={Math.max(0, (progress - 0.5) * 2)}
          >
            {cluster.name}
          </text>
        ))}

        {/* Query point */}
        <g opacity={Math.max(0, (progress - 0.7) * 3.3)}>
          <circle cx="110" cy="65" r="6" fill="#9C27B0" stroke="#2D2D2D" strokeWidth="2" />
          <text x="130" y="55" fontSize="9" fill="#9C27B0">
            Query
          </text>
          <line
            x1="110"
            y1="65"
            x2={lerp(110, 95, Math.max(0, (progress - 0.8) * 5))}
            y2={lerp(65, 75, Math.max(0, (progress - 0.8) * 5))}
            stroke="#9C27B0"
            strokeWidth="1.5"
            strokeDasharray="3"
          />
        </g>
      </Box>
    </Box>
  );
});

// ============================================================
// 16. Regularization - Techniques reveal progressively
// ============================================================
export const RegularizationMedia = memo(function RegularizationMedia({
  progress,
}: AnimatedMediaProps) {
  const techniques = [
    { icon: "💧", name: "Dropout", desc: "Desliga neurônios aleatoriamente" },
    { icon: "📏", name: "L1/L2", desc: "Penaliza pesos grandes" },
    { icon: "✋", name: "Early Stop", desc: "Para antes do overfit" },
    { icon: "📊", name: "Data Aug", desc: "Aumenta dados de treino" },
  ];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        🛡️ Técnicas de Regularização
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {techniques.map((tech, i) => {
          const techProgress = stagger(progress, i, techniques.length, 0.3);
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1,
                bgcolor: progress > (i + 1) / techniques.length ? "secondary.light" : "background.paper",
                borderRadius: 2,
                border: "1.5px solid #2D2D2D",
                opacity: techProgress,
                transform: `translateX(${lerp(-20, 0, techProgress)}px) scale(${lerp(0.9, 1, techProgress)})`,
              }}
            >
              <Box sx={{ fontSize: "1.2rem" }}>{tech.icon}</Box>
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  {tech.name}
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                  {tech.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

// ============================================================
// Export map for dynamic component loading
// ============================================================
export const visualizationComponents: Record<
  string,
  React.ComponentType<AnimatedMediaProps>
> = {
  "neural-network": NeuralNetworkMedia,
  "gradient-descent": GradientDescentMedia,
  "decision-tree": DecisionTreeMedia,
  "confusion-matrix": ConfusionMatrixMedia,
  "loss-chart": LossChartMedia,
  "data-flow": DataFlowMedia,
  transformer: TransformerMedia,
  attention: AttentionMedia,
  convolution: ConvolutionMedia,
  "cnn-architecture": CNNArchitectureMedia,
  pooling: PoolingMedia,
  "transfer-learning": TransferLearningMedia,
  overfitting: OverfittingMedia,
  "rag-pipeline": RAGPipelineMedia,
  "embedding-space": EmbeddingSpaceMedia,
  regularization: RegularizationMedia,
};

// Legacy exports for backward compatibility
export const NeuralNetworkSVG = NeuralNetworkMedia;
export const TransformerArchitecture = TransformerMedia;
export const AttentionMechanism = AttentionMedia;
export const CNNVisualization = ConvolutionMedia;
export const PoolingVisualization = PoolingMedia;
export const TransferLearningDiagram = TransferLearningMedia;
export const OverfittingChart = OverfittingMedia;
export const RAGArchitecture = RAGPipelineMedia;
export const EmbeddingVisualization = EmbeddingSpaceMedia;
export const RegularizationTechniques = RegularizationMedia;
