"use client";

import { Box, Typography } from "@mui/material";
import { memo } from "react";
import type { VisualizationType } from "@/types";

// =====================================================
// STATES CONFIGURATION
// Each visualization defines how many discrete states it has
// =====================================================
export const VISUALIZATION_STATES: Record<VisualizationType, number> = {
  "neural-network": 4,    // One per layer activation
  "gradient-descent": 5,  // Steps down the gradient
  "decision-tree": 4,     // Level by level reveal
  "confusion-matrix": 4,  // Quadrant by quadrant
  "loss-chart": 5,        // Line segments drawing
  "data-flow": 4,         // Flow steps
  "transformer": 5,       // Input → Encoder → Attention → Decoder → Output
  "attention": 3,         // Query column → Key column → Connections
  "convolution": 4,       // Filter positions
  "cnn-architecture": 5,  // Layer by layer
  "pooling": 3,           // Input → Operation → Output
  "transfer-learning": 3, // Base model → Freeze → New head
  "overfitting": 3,       // Training fit → Test diverge → Comparison
  "rag-pipeline": 4,      // Query → Retrieve → Augment → Generate
  "embedding-space": 4,   // Points → Clusters → Connections → Labels
  "regularization": 3,    // Without → With L2 → With Dropout
};

// Types
export interface StatefulMediaProps {
  /** Current state index (0 to totalStates - 1) */
  state: number;
  /** Progress within current state (0 to 1) for smooth transitions (optional, defaults to 1) */
  stateProgress?: number;
}

// Utility: check if a state is active (reached)
const isStateActive = (currentState: number, targetState: number): boolean =>
  currentState >= targetState;

// Utility: get transition progress into a state
// stateProgress defaults to 1 (instant transition) when not provided
const getStateTransition = (
  currentState: number,
  stateProgress: number | undefined,
  targetState: number
): number => {
  if (currentState > targetState) return 1;
  if (currentState < targetState) return 0;
  return stateProgress ?? 1;
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

// =====================================================
// 1. NEURAL NETWORK - 4 states (one per layer)
// =====================================================
export const NeuralNetworkMedia = memo(function NeuralNetworkMedia({
  state,
  stateProgress,
}: StatefulMediaProps) {
  const layers = [
    // Layer 0: Input
    [
      { x: 50, y: 80 },
      { x: 50, y: 160 },
      { x: 50, y: 240 },
    ],
    // Layer 1: Hidden 1
    [
      { x: 150, y: 60 },
      { x: 150, y: 120 },
      { x: 150, y: 180 },
      { x: 150, y: 240 },
    ],
    // Layer 2: Hidden 2
    [
      { x: 250, y: 100 },
      { x: 250, y: 180 },
    ],
    // Layer 3: Output
    [{ x: 350, y: 140 }],
  ];

  const layerColors = ["#4A90A4", "#E85D3A", "#2ECC71", "#9B59B6"];

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
        🧠 Rede Neural em Ação
      </Typography>
      <Box component="svg" viewBox="0 0 400 320" sx={{ width: "100%", maxWidth: 350 }}>
        {/* Draw connections layer by layer */}
        {layers.slice(0, -1).map((fromLayer, layerIdx) => {
          const toLayer = layers[layerIdx + 1];
          const connectionActive = isStateActive(state, layerIdx);

          return fromLayer.map((from, i) =>
            toLayer.map((to, j) => (
              <line
                key={`conn-${layerIdx}-${i}-${j}`}
                x1={from.x}
                y1={from.y}
                x2={connectionActive ? to.x : from.x}
                y2={connectionActive ? to.y : from.y}
                stroke={layerColors[layerIdx]}
                strokeWidth={2}
                opacity={connectionActive ? 0.6 : 0}
                style={{
                  transition: "all 0.5s ease-out",
                }}
              />
            ))
          );
        })}

        {/* Draw nodes */}
        {layers.map((layer, layerIdx) => {
          const layerActive = isStateActive(state, layerIdx);
          const transition = getStateTransition(state, stateProgress, layerIdx);

          return layer.map((node, nodeIdx) => (
            <g key={`node-${layerIdx}-${nodeIdx}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={layerActive ? 18 : 8}
                fill={layerActive ? layerColors[layerIdx] : "#DDD"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "all 0.4s ease-out" }}
              />
              {layerActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={10}
                  fill="#FDF9F3"
                  opacity={transition}
                  style={{ transition: "opacity 0.3s ease-out" }}
                />
              )}
            </g>
          ));
        })}

        {/* Layer labels */}
        {["Input", "Hidden 1", "Hidden 2", "Output"].map((label, i) => (
          <text
            key={label}
            x={[50, 150, 250, 350][i]}
            y={290}
            textAnchor="middle"
            fontSize="12"
            fill={isStateActive(state, i) ? "#2D2D2D" : "#AAA"}
            style={{ transition: "fill 0.3s ease-out" }}
          >
            {label}
          </text>
        ))}
      </Box>
    </Box>
  );
});

// =====================================================
// 2. ATTENTION - 3 states (Query, Key, Connections)
// =====================================================
export const AttentionMedia = memo(function AttentionMedia({
  state,
}: StatefulMediaProps) {
  const queries = ["Q₁", "Q₂", "Q₃"];
  const keys = ["K₁", "K₂", "K₃"];
  const attentionWeights = [
    [0.7, 0.2, 0.1],
    [0.1, 0.8, 0.1],
    [0.2, 0.2, 0.6],
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
        }}
      >
        🔍 Self-Attention
      </Typography>
      <Box component="svg" viewBox="0 0 360 280" sx={{ width: "100%", maxWidth: 340 }}>
        {/* Query column - State 0 */}
        {queries.map((q, i) => {
          const active = isStateActive(state, 0);
          return (
            <g key={`q-${i}`}>
              <rect
                x={40}
                y={60 + i * 70}
                width={60}
                height={50}
                rx={8}
                fill={active ? "#4A90A4" : "#E0E0E0"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "fill 0.4s ease-out" }}
              />
              <text
                x={70}
                y={90 + i * 70}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill={active ? "#FFF" : "#999"}
                style={{ transition: "fill 0.3s ease-out" }}
              >
                {q}
              </text>
            </g>
          );
        })}

        {/* Key column - State 1 */}
        {keys.map((k, i) => {
          const active = isStateActive(state, 1);
          return (
            <g key={`k-${i}`}>
              <rect
                x={260}
                y={60 + i * 70}
                width={60}
                height={50}
                rx={8}
                fill={active ? "#E85D3A" : "#E0E0E0"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "fill 0.4s ease-out" }}
              />
              <text
                x={290}
                y={90 + i * 70}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill={active ? "#FFF" : "#999"}
                style={{ transition: "fill 0.3s ease-out" }}
              >
                {k}
              </text>
            </g>
          );
        })}

        {/* Attention connections - State 2 */}
        {queries.map((_, qi) =>
          keys.map((_, ki) => {
            const active = isStateActive(state, 2);
            const weight = attentionWeights[qi][ki];
            return (
              <line
                key={`att-${qi}-${ki}`}
                x1={100}
                y1={85 + qi * 70}
                x2={active ? 260 : 100}
                y2={active ? 85 + ki * 70 : 85 + qi * 70}
                stroke="#9B59B6"
                strokeWidth={weight * 4 + 1}
                opacity={active ? weight : 0}
                style={{ transition: "all 0.5s ease-out" }}
              />
            );
          })
        )}

        {/* Labels */}
        <text x={70} y={35} textAnchor="middle" fontSize="14" fill="#666">
          Query
        </text>
        <text x={290} y={35} textAnchor="middle" fontSize="14" fill="#666">
          Key
        </text>
      </Box>
    </Box>
  );
});

// =====================================================
// 3. TRANSFORMER - 5 states
// =====================================================
export const TransformerMedia = memo(function TransformerMedia({
  state,
}: StatefulMediaProps) {
  const blocks = [
    { label: "Input", y: 260, color: "#4A90A4" },
    { label: "Encoder", y: 200, color: "#E85D3A" },
    { label: "Attention", y: 140, color: "#9B59B6" },
    { label: "Decoder", y: 80, color: "#2ECC71" },
    { label: "Output", y: 20, color: "#F39C12" },
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
        }}
      >
        🤖 Transformer Architecture
      </Typography>
      <Box component="svg" viewBox="0 0 300 320" sx={{ width: "100%", maxWidth: 280 }}>
        {blocks.map((block, i) => {
          const active = isStateActive(state, i);

          return (
            <g key={block.label}>
              {/* Connection to next block */}
              {i < blocks.length - 1 && (
                <line
                  x1={150}
                  y1={block.y}
                  x2={150}
                  y2={active ? blocks[i + 1].y + 40 : block.y}
                  stroke={block.color}
                  strokeWidth={3}
                  opacity={active ? 0.8 : 0}
                  strokeDasharray={active ? "none" : "5,5"}
                  style={{ transition: "all 0.4s ease-out" }}
                />
              )}

              {/* Block */}
              <rect
                x={50}
                y={block.y}
                width={200}
                height={40}
                rx={8}
                fill={active ? block.color : "#E0E0E0"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "fill 0.4s ease-out" }}
              />

              {/* Label */}
              <text
                x={150}
                y={block.y + 26}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill={active ? "#FFF" : "#999"}
                style={{ transition: "fill 0.3s ease-out" }}
              >
                {block.label}
              </text>
            </g>
          );
        })}
      </Box>
    </Box>
  );
});

// =====================================================
// 4. GRADIENT DESCENT - 5 states (steps down)
// =====================================================
export const GradientDescentMedia = memo(function GradientDescentMedia({
  state,
}: StatefulMediaProps) {
  // Ball positions for each state
  const positions = [
    { x: 50, y: 80 },
    { x: 110, y: 120 },
    { x: 170, y: 180 },
    { x: 220, y: 220 },
    { x: 260, y: 250 },
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
        }}
      >
        ⛰️ Gradient Descent
      </Typography>
      <Box component="svg" viewBox="0 0 350 300" sx={{ width: "100%", maxWidth: 320 }}>
        {/* Loss surface curve */}
        <path
          d="M 20 100 Q 100 60 150 140 Q 200 220 260 250 Q 320 280 340 260"
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={3}
        />

        {/* Path taken */}
        {positions.slice(0, state + 1).map((pos, i) => {
          if (i === 0) return null;
          const prev = positions[i - 1];
          return (
            <line
              key={`path-${i}`}
              x1={prev.x}
              y1={prev.y}
              x2={pos.x}
              y2={pos.y}
              stroke="#E85D3A"
              strokeWidth={2}
              strokeDasharray="5,3"
              opacity={0.7}
              style={{ transition: "all 0.3s ease-out" }}
            />
          );
        })}

        {/* Position markers */}
        {positions.map((pos, i) => {
          const reached = isStateActive(state, i);
          const isCurrent = state === i;

          return (
            <g key={`pos-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isCurrent ? 16 : reached ? 8 : 6}
                fill={isCurrent ? "#E85D3A" : reached ? "#4A90A4" : "#DDD"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "all 0.4s ease-out" }}
              />
              {isCurrent && (
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#FFF"
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}

        {/* Labels */}
        <text x={50} y={60} textAnchor="middle" fontSize="12" fill="#666">
          Start
        </text>
        <text x={280} y={280} textAnchor="middle" fontSize="12" fill="#666">
          Minimum
        </text>
      </Box>
    </Box>
  );
});

// =====================================================
// 5. DECISION TREE - 4 states (levels)
// =====================================================
export const DecisionTreeMedia = memo(function DecisionTreeMedia({
  state,
}: StatefulMediaProps) {
  const levels = [
    [{ x: 175, y: 40, label: "Root" }],
    [
      { x: 100, y: 110, label: "A" },
      { x: 250, y: 110, label: "B" },
    ],
    [
      { x: 50, y: 180, label: "A1" },
      { x: 150, y: 180, label: "A2" },
      { x: 200, y: 180, label: "B1" },
      { x: 300, y: 180, label: "B2" },
    ],
    [
      { x: 25, y: 250, label: "✓" },
      { x: 75, y: 250, label: "✗" },
      { x: 125, y: 250, label: "✓" },
      { x: 175, y: 250, label: "✗" },
      { x: 225, y: 250, label: "✓" },
      { x: 275, y: 250, label: "✓" },
      { x: 325, y: 250, label: "✗" },
    ],
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
        }}
      >
        🌳 Decision Tree
      </Typography>
      <Box component="svg" viewBox="0 0 350 280" sx={{ width: "100%", maxWidth: 330 }}>
        {/* Draw connections */}
        {state >= 1 &&
          levels[0].map((parent) =>
            levels[1].map((child, ci) => (
              <line
                key={`conn-0-${ci}`}
                x1={parent.x}
                y1={parent.y + 20}
                x2={child.x}
                y2={child.y - 20}
                stroke="#4A90A4"
                strokeWidth={2}
                opacity={0.6}
              />
            ))
          )}

        {state >= 2 &&
          levels[1].map((parent, pi) =>
            levels[2].slice(pi * 2, pi * 2 + 2).map((child, ci) => (
              <line
                key={`conn-1-${pi}-${ci}`}
                x1={parent.x}
                y1={parent.y + 20}
                x2={child.x}
                y2={child.y - 20}
                stroke="#E85D3A"
                strokeWidth={2}
                opacity={0.6}
              />
            ))
          )}

        {state >= 3 &&
          levels[2].map((parent, pi) => {
            const childIndices =
              pi < 2 ? [pi * 2, pi * 2 + 1] : pi === 2 ? [4] : [5, 6];
            return childIndices.map((ci) => {
              const child = levels[3][ci];
              if (!child) return null;
              return (
                <line
                  key={`conn-2-${pi}-${ci}`}
                  x1={parent.x}
                  y1={parent.y + 20}
                  x2={child.x}
                  y2={child.y - 20}
                  stroke="#2ECC71"
                  strokeWidth={2}
                  opacity={0.6}
                />
              );
            });
          })}

        {/* Draw nodes */}
        {levels.map((level, levelIdx) => {
          const active = isStateActive(state, levelIdx);
          const colors = ["#4A90A4", "#E85D3A", "#2ECC71", "#9B59B6"];

          return level.map((node, nodeIdx) => (
            <g key={`node-${levelIdx}-${nodeIdx}`}>
              {levelIdx < 3 ? (
                <rect
                  x={node.x - 25}
                  y={node.y - 18}
                  width={50}
                  height={36}
                  rx={6}
                  fill={active ? colors[levelIdx] : "#E0E0E0"}
                  stroke="#2D2D2D"
                  strokeWidth={2}
                  style={{ transition: "fill 0.4s ease-out" }}
                />
              ) : (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={16}
                  fill={active ? (node.label === "✓" ? "#2ECC71" : "#E74C3C") : "#E0E0E0"}
                  stroke="#2D2D2D"
                  strokeWidth={2}
                  style={{ transition: "fill 0.4s ease-out" }}
                />
              )}
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fontSize={levelIdx < 3 ? 14 : 16}
                fontWeight="bold"
                fill={active ? "#FFF" : "#999"}
                style={{ transition: "fill 0.3s ease-out" }}
              >
                {node.label}
              </text>
            </g>
          ));
        })}
      </Box>
    </Box>
  );
});

// =====================================================
// 6. CONFUSION MATRIX - 4 states (quadrants)
// =====================================================
export const ConfusionMatrixMedia = memo(function ConfusionMatrixMedia({
  state,
}: StatefulMediaProps) {
  const cells = [
    { label: "TP", value: 42, x: 0, y: 0, color: "#2ECC71" },
    { label: "FP", value: 8, x: 1, y: 0, color: "#E74C3C" },
    { label: "FN", value: 5, x: 0, y: 1, color: "#E74C3C" },
    { label: "TN", value: 45, x: 1, y: 1, color: "#2ECC71" },
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
        }}
      >
        📊 Matriz de Confusão
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 0.5 }}>
        {/* Header */}
        <Box sx={{ p: 1 }} />
        <Box sx={{ p: 1, textAlign: "center", fontWeight: "bold", fontSize: "0.8rem" }}>
          Pred +
        </Box>
        <Box sx={{ p: 1, textAlign: "center", fontWeight: "bold", fontSize: "0.8rem" }}>
          Pred -
        </Box>

        {/* Row 1 */}
        <Box sx={{ p: 1, fontWeight: "bold", fontSize: "0.8rem" }}>Real +</Box>
        {cells.slice(0, 2).map((cell, i) => {
          const active = isStateActive(state, i);
          return (
            <Box
              key={cell.label}
              sx={{
                width: 80,
                height: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: active ? cell.color : "#E0E0E0",
                borderRadius: 1,
                border: "2px solid #2D2D2D",
                transition: "all 0.4s ease-out",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: active ? "#FFF" : "#999",
                  transition: "color 0.3s ease-out",
                }}
              >
                {active ? cell.value : "?"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: active ? "rgba(255,255,255,0.8)" : "#AAA",
                  transition: "color 0.3s ease-out",
                }}
              >
                {cell.label}
              </Typography>
            </Box>
          );
        })}

        {/* Row 2 */}
        <Box sx={{ p: 1, fontWeight: "bold", fontSize: "0.8rem" }}>Real -</Box>
        {cells.slice(2).map((cell, i) => {
          const active = isStateActive(state, i + 2);
          return (
            <Box
              key={cell.label}
              sx={{
                width: 80,
                height: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: active ? cell.color : "#E0E0E0",
                borderRadius: 1,
                border: "2px solid #2D2D2D",
                transition: "all 0.4s ease-out",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: active ? "#FFF" : "#999",
                  transition: "color 0.3s ease-out",
                }}
              >
                {active ? cell.value : "?"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: active ? "rgba(255,255,255,0.8)" : "#AAA",
                  transition: "color 0.3s ease-out",
                }}
              >
                {cell.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

// =====================================================
// 7. LOSS CHART - 5 states (line drawing)
// =====================================================
export const LossChartMedia = memo(function LossChartMedia({
  state,
}: StatefulMediaProps) {
  // Loss curve points
  const points = [
    { x: 30, y: 40, epoch: 0 },
    { x: 90, y: 80, epoch: 1 },
    { x: 150, y: 140, epoch: 2 },
    { x: 210, y: 190, epoch: 3 },
    { x: 270, y: 220, epoch: 4 },
  ];

  const pathSegments = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${280 - p.y}`;
    return `L ${p.x} ${280 - p.y}`;
  });

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        📉 Training Loss
      </Typography>
      <Box component="svg" viewBox="0 0 320 280" sx={{ width: "100%", maxWidth: 300 }}>
        {/* Axes */}
        <line x1={25} y1={250} x2={290} y2={250} stroke="#2D2D2D" strokeWidth={2} />
        <line x1={25} y1={250} x2={25} y2={30} stroke="#2D2D2D" strokeWidth={2} />

        {/* Grid lines */}
        {[50, 100, 150, 200].map((y) => (
          <line
            key={y}
            x1={25}
            y1={280 - y}
            x2={290}
            y2={280 - y}
            stroke="#E0E0E0"
            strokeWidth={1}
          />
        ))}

        {/* Loss curve - progressive reveal */}
        <path
          d={pathSegments.slice(0, state + 2).join(" ")}
          fill="none"
          stroke="#E85D3A"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transition: "all 0.5s ease-out" }}
        />

        {/* Data points */}
        {points.map((p, i) => {
          const active = isStateActive(state, i);
          return (
            <g key={`point-${i}`}>
              <circle
                cx={p.x}
                cy={280 - p.y}
                r={active ? 8 : 4}
                fill={active ? "#E85D3A" : "#DDD"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "all 0.4s ease-out" }}
              />
              {active && (
                <text
                  x={p.x}
                  y={280 - p.y - 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#666"
                >
                  {(2.5 - i * 0.5).toFixed(1)}
                </text>
              )}
            </g>
          );
        })}

        {/* Labels */}
        <text x={155} y={275} textAnchor="middle" fontSize="12" fill="#666">
          Epochs
        </text>
        <text
          x={10}
          y={140}
          textAnchor="middle"
          fontSize="12"
          fill="#666"
          transform="rotate(-90, 10, 140)"
        >
          Loss
        </text>
      </Box>
    </Box>
  );
});

// =====================================================
// 8. DATA FLOW - 4 states
// =====================================================
export const DataFlowMedia = memo(function DataFlowMedia({
  state,
}: StatefulMediaProps) {
  const steps = [
    { label: "Data", x: 50, icon: "📊" },
    { label: "Clean", x: 130, icon: "🧹" },
    { label: "Train", x: 210, icon: "🎯" },
    { label: "Deploy", x: 290, icon: "🚀" },
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
        }}
      >
        🔄 ML Pipeline
      </Typography>
      <Box component="svg" viewBox="0 0 350 200" sx={{ width: "100%", maxWidth: 320 }}>
        {/* Connections */}
        {steps.slice(0, -1).map((step, i) => {
          const active = isStateActive(state, i);
          const next = steps[i + 1];
          return (
            <g key={`conn-${i}`}>
              <line
                x1={step.x + 30}
                y1={100}
                x2={active ? next.x - 30 : step.x + 30}
                y2={100}
                stroke="#4A90A4"
                strokeWidth={3}
                style={{ transition: "all 0.5s ease-out" }}
              />
              {active && (
                <polygon
                  points={`${next.x - 35},95 ${next.x - 25},100 ${next.x - 35},105`}
                  fill="#4A90A4"
                />
              )}
            </g>
          );
        })}

        {/* Step boxes */}
        {steps.map((step, i) => {
          const active = isStateActive(state, i);
          return (
            <g key={step.label}>
              <rect
                x={step.x - 30}
                y={70}
                width={60}
                height={60}
                rx={10}
                fill={active ? "#4A90A4" : "#E0E0E0"}
                stroke="#2D2D2D"
                strokeWidth={2}
                style={{ transition: "fill 0.4s ease-out" }}
              />
              <text
                x={step.x}
                y={95}
                textAnchor="middle"
                fontSize="20"
                opacity={active ? 1 : 0.5}
              >
                {step.icon}
              </text>
              <text
                x={step.x}
                y={155}
                textAnchor="middle"
                fontSize="12"
                fill={active ? "#2D2D2D" : "#999"}
                fontWeight={active ? "bold" : "normal"}
                style={{ transition: "all 0.3s ease-out" }}
              >
                {step.label}
              </text>
            </g>
          );
        })}
      </Box>
    </Box>
  );
});

// =====================================================
// 9. CONVOLUTION - 4 states (filter positions)
// =====================================================
export const ConvolutionMedia = memo(function ConvolutionMedia({
  state,
}: StatefulMediaProps) {
  const inputGrid = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
  ];

  const filterPositions = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
  ];

  const outputValues = [36, 54, 72, 90];

  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        🔲 Convolução
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* Input grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 28px)",
            gap: "2px",
            position: "relative",
          }}
        >
          {inputGrid.map((row, ri) =>
            row.map((val, ci) => {
              const currentFilter = filterPositions[Math.min(state, 3)];
              const isInFilter =
                ri >= currentFilter.row &&
                ri < currentFilter.row + 3 &&
                ci >= currentFilter.col &&
                ci < currentFilter.col + 3;

              return (
                <Box
                  key={`${ri}-${ci}`}
                  sx={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isInFilter ? "#E85D3A" : "#F5F5F5",
                    color: isInFilter ? "#FFF" : "#666",
                    fontSize: "0.75rem",
                    fontWeight: isInFilter ? "bold" : "normal",
                    borderRadius: 0.5,
                    border: "1px solid #DDD",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  {val}
                </Box>
              );
            })
          )}
        </Box>

        {/* Arrow */}
        <Typography sx={{ fontSize: "1.5rem" }}>→</Typography>

        {/* Output grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 36px)",
            gap: "4px",
          }}
        >
          {[0, 1, 2, 3].map((i) => {
            const active = isStateActive(state, i);
            return (
              <Box
                key={i}
                sx={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: active ? "#4A90A4" : "#E0E0E0",
                  color: active ? "#FFF" : "#999",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  borderRadius: 1,
                  border: "2px solid #2D2D2D",
                  transition: "all 0.4s ease-out",
                }}
              >
                {active ? outputValues[i] : "?"}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
});

// =====================================================
// 10. CNN ARCHITECTURE - 5 states
// =====================================================
export const CNNArchitectureMedia = memo(function CNNArchitectureMedia({
  state,
}: StatefulMediaProps) {
  const layers = [
    { label: "Input", type: "input", color: "#4A90A4" },
    { label: "Conv", type: "conv", color: "#E85D3A" },
    { label: "Pool", type: "pool", color: "#2ECC71" },
    { label: "FC", type: "fc", color: "#9B59B6" },
    { label: "Output", type: "output", color: "#F39C12" },
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
        }}
      >
        🏗️ CNN Architecture
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
        {layers.map((layer, i) => {
          const active = isStateActive(state, i);
          const heights = [80, 70, 50, 40, 30];

          return (
            <Box key={layer.label} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 50,
                  height: heights[i],
                  bgcolor: active ? layer.color : "#E0E0E0",
                  borderRadius: 1,
                  border: "2px solid #2D2D2D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease-out",
                  transform: active ? "scale(1)" : "scale(0.9)",
                }}
              >
                {active && (
                  <Typography sx={{ color: "#FFF", fontSize: "1.2rem" }}>
                    {["📷", "🔲", "⬇️", "🔗", "📤"][i]}
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.65rem",
                  fontWeight: active ? "bold" : "normal",
                  color: active ? "#2D2D2D" : "#999",
                  transition: "all 0.3s ease-out",
                }}
              >
                {layer.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

// =====================================================
// 11. POOLING - 3 states
// =====================================================
export const PoolingMedia = memo(function PoolingMedia({
  state,
}: StatefulMediaProps) {
  const inputData = [
    [4, 2, 1, 3],
    [1, 5, 3, 2],
    [2, 3, 6, 1],
    [1, 2, 1, 4],
  ];

  const pooledData = [
    [5, 3],
    [3, 6],
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
        }}
      >
        ⬇️ Max Pooling
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* Input grid (State 0) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 32px)",
            gap: "2px",
            opacity: isStateActive(state, 0) ? 1 : 0.3,
            transition: "opacity 0.4s ease-out",
          }}
        >
          {inputData.flat().map((val, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const isMax =
              val ===
              Math.max(
                ...inputData
                  .slice(Math.floor(row / 2) * 2, Math.floor(row / 2) * 2 + 2)
                  .flatMap((r) => r.slice(Math.floor(col / 2) * 2, Math.floor(col / 2) * 2 + 2))
              );
            const highlightMax = isStateActive(state, 1) && isMax;

            return (
              <Box
                key={i}
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: highlightMax ? "#E85D3A" : "#F5F5F5",
                  color: highlightMax ? "#FFF" : "#666",
                  fontSize: "0.85rem",
                  fontWeight: highlightMax ? "bold" : "normal",
                  borderRadius: 0.5,
                  border: "1px solid #DDD",
                  transition: "all 0.4s ease-out",
                }}
              >
                {val}
              </Box>
            );
          })}
        </Box>

        {/* Arrow */}
        <Typography
          sx={{
            fontSize: "1.5rem",
            opacity: isStateActive(state, 1) ? 1 : 0.3,
            transition: "opacity 0.4s ease-out",
          }}
        >
          →
        </Typography>

        {/* Output grid (State 2) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 40px)",
            gap: "4px",
            opacity: isStateActive(state, 2) ? 1 : 0.3,
            transition: "opacity 0.4s ease-out",
          }}
        >
          {pooledData.flat().map((val, i) => (
            <Box
              key={i}
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isStateActive(state, 2) ? "#4A90A4" : "#E0E0E0",
                color: isStateActive(state, 2) ? "#FFF" : "#999",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 1,
                border: "2px solid #2D2D2D",
                transition: "all 0.4s ease-out",
              }}
            >
              {isStateActive(state, 2) ? val : "?"}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
});

// =====================================================
// 12. TRANSFER LEARNING - 3 states
// =====================================================
export const TransferLearningMedia = memo(function TransferLearningMedia({
  state,
}: StatefulMediaProps) {
  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        🔄 Transfer Learning
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        {/* Base model (State 0) */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 0) ? "#4A90A4" : "#E0E0E0",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: isStateActive(state, 0) ? "#FFF" : "#999",
              textAlign: "center",
            }}
          >
            🧠 Pre-trained Base Model (ImageNet)
          </Typography>
        </Box>

        {/* Frozen layers (State 1) */}
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: isStateActive(state, 1) ? "#95A5A6" : "#E0E0E0",
            border: isStateActive(state, 1) ? "2px dashed #2D2D2D" : "2px solid transparent",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: isStateActive(state, 1) ? "#FFF" : "#999",
              textAlign: "center",
            }}
          >
            🔒 Frozen Layers
          </Typography>
        </Box>

        {/* New head (State 2) */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 2) ? "#E85D3A" : "#E0E0E0",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: isStateActive(state, 2) ? "#FFF" : "#999",
              textAlign: "center",
            }}
          >
            🎯 New Task Head (Your Data)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

// =====================================================
// 13. OVERFITTING - 3 states
// =====================================================
export const OverfittingMedia = memo(function OverfittingMedia({
  state,
}: StatefulMediaProps) {
  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        📈 Overfitting
      </Typography>
      <Box component="svg" viewBox="0 0 300 200" sx={{ width: "100%", maxWidth: 280 }}>
        {/* Axes */}
        <line x1={40} y1={170} x2={280} y2={170} stroke="#2D2D2D" strokeWidth={2} />
        <line x1={40} y1={170} x2={40} y2={20} stroke="#2D2D2D" strokeWidth={2} />

        {/* Training curve (State 0) */}
        <path
          d="M 50 150 Q 100 100 150 70 Q 200 50 260 30"
          fill="none"
          stroke={isStateActive(state, 0) ? "#4A90A4" : "#DDD"}
          strokeWidth={3}
          style={{ transition: "stroke 0.4s ease-out" }}
        />

        {/* Validation curve (State 1) */}
        <path
          d="M 50 155 Q 100 110 150 90 Q 200 100 260 140"
          fill="none"
          stroke={isStateActive(state, 1) ? "#E85D3A" : "#DDD"}
          strokeWidth={3}
          strokeDasharray={isStateActive(state, 1) ? "5,3" : "none"}
          style={{ transition: "stroke 0.4s ease-out" }}
        />

        {/* Overfitting zone highlight (State 2) */}
        {isStateActive(state, 2) && (
          <rect
            x={180}
            y={20}
            width={90}
            height={150}
            fill="#E74C3C"
            opacity={0.15}
            rx={5}
          />
        )}

        {/* Legend */}
        <g opacity={isStateActive(state, 0) ? 1 : 0.3}>
          <line x1={60} y1={185} x2={80} y2={185} stroke="#4A90A4" strokeWidth={2} />
          <text x={85} y={188} fontSize="10" fill="#666">
            Train
          </text>
        </g>
        <g opacity={isStateActive(state, 1) ? 1 : 0.3}>
          <line x1={130} y1={185} x2={150} y2={185} stroke="#E85D3A" strokeWidth={2} />
          <text x={155} y={188} fontSize="10" fill="#666">
            Val
          </text>
        </g>

        {/* Labels */}
        <text x={160} y={195} textAnchor="middle" fontSize="11" fill="#666">
          Epochs
        </text>
      </Box>
    </Box>
  );
});

// =====================================================
// 14. RAG PIPELINE - 4 states
// =====================================================
export const RAGPipelineMedia = memo(function RAGPipelineMedia({
  state,
}: StatefulMediaProps) {
  const steps = [
    { label: "Query", icon: "❓", color: "#4A90A4" },
    { label: "Retrieve", icon: "🔍", color: "#E85D3A" },
    { label: "Augment", icon: "📚", color: "#2ECC71" },
    { label: "Generate", icon: "✨", color: "#9B59B6" },
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
        }}
      >
        🔗 RAG Pipeline
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
        {steps.map((step, i) => {
          const active = isStateActive(state, i);
          return (
            <Box key={step.label} sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  bgcolor: active ? step.color : "#E0E0E0",
                  border: "2px solid #2D2D2D",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease-out",
                  transform: active ? "scale(1)" : "scale(0.85)",
                }}
              >
                <Typography sx={{ fontSize: "1.3rem" }}>{step.icon}</Typography>
              </Box>
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    width: 20,
                    height: 2,
                    bgcolor: active ? step.color : "#DDD",
                    mx: 0.5,
                    transition: "all 0.4s ease-out",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        {steps.map((step, i) => (
          <Typography
            key={step.label}
            sx={{
              fontSize: "0.65rem",
              fontWeight: isStateActive(state, i) ? "bold" : "normal",
              color: isStateActive(state, i) ? "#2D2D2D" : "#999",
              width: 55,
              textAlign: "center",
              transition: "all 0.3s ease-out",
            }}
          >
            {step.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
});

// =====================================================
// 15. EMBEDDING SPACE - 4 states
// =====================================================
export const EmbeddingSpaceMedia = memo(function EmbeddingSpaceMedia({
  state,
}: StatefulMediaProps) {
  // Points in 2D embedding space
  const clusters = [
    { points: [{ x: 60, y: 80 }, { x: 80, y: 100 }, { x: 70, y: 120 }], color: "#E85D3A", label: "A" },
    { points: [{ x: 200, y: 70 }, { x: 220, y: 90 }, { x: 210, y: 110 }], color: "#4A90A4", label: "B" },
    { points: [{ x: 140, y: 180 }, { x: 160, y: 200 }, { x: 150, y: 220 }], color: "#2ECC71", label: "C" },
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
        }}
      >
        🌌 Embedding Space
      </Typography>
      <Box component="svg" viewBox="0 0 300 280" sx={{ width: "100%", maxWidth: 280 }}>
        {/* Grid */}
        <rect x={30} y={30} width={240} height={220} fill="#FAFAFA" stroke="#E0E0E0" strokeWidth={1} />

        {/* Connection lines (State 2) */}
        {isStateActive(state, 2) &&
          clusters.map((cluster, ci) =>
            cluster.points.slice(1).map((p, pi) => (
              <line
                key={`conn-${ci}-${pi}`}
                x1={cluster.points[0].x}
                y1={cluster.points[0].y}
                x2={p.x}
                y2={p.y}
                stroke={cluster.color}
                strokeWidth={1}
                opacity={0.4}
                strokeDasharray="3,2"
              />
            ))
          )}

        {/* Cluster circles (State 1) */}
        {isStateActive(state, 1) &&
          clusters.map((cluster, ci) => (
            <circle
              key={`cluster-${ci}`}
              cx={(cluster.points[0].x + cluster.points[1].x + cluster.points[2].x) / 3}
              cy={(cluster.points[0].y + cluster.points[1].y + cluster.points[2].y) / 3}
              r={40}
              fill={cluster.color}
              opacity={0.15}
              style={{ transition: "all 0.4s ease-out" }}
            />
          ))}

        {/* Points (State 0) */}
        {clusters.map((cluster, ci) =>
          cluster.points.map((p, pi) => (
            <circle
              key={`point-${ci}-${pi}`}
              cx={p.x}
              cy={p.y}
              r={isStateActive(state, 0) ? 8 : 3}
              fill={isStateActive(state, 0) ? cluster.color : "#DDD"}
              stroke="#2D2D2D"
              strokeWidth={1}
              style={{ transition: "all 0.4s ease-out" }}
            />
          ))
        )}

        {/* Labels (State 3) */}
        {isStateActive(state, 3) &&
          clusters.map((cluster, ci) => (
            <text
              key={`label-${ci}`}
              x={(cluster.points[0].x + cluster.points[1].x + cluster.points[2].x) / 3}
              y={(cluster.points[0].y + cluster.points[1].y + cluster.points[2].y) / 3 - 50}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={cluster.color}
            >
              Cluster {cluster.label}
            </text>
          ))}

        {/* Axes labels */}
        <text x={150} y={268} textAnchor="middle" fontSize="11" fill="#666">
          Dimension 1
        </text>
        <text x={15} y={140} textAnchor="middle" fontSize="11" fill="#666" transform="rotate(-90, 15, 140)">
          Dimension 2
        </text>
      </Box>
    </Box>
  );
});

// =====================================================
// 16. REGULARIZATION - 3 states
// =====================================================
export const RegularizationMedia = memo(function RegularizationMedia({
  state,
}: StatefulMediaProps) {
  return (
    <Box sx={mediaCardStyle}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        🛡️ Regularização
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Without regularization (State 0) */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 0) ? "#E74C3C" : "#E0E0E0",
            width: 100,
            textAlign: "center",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", mb: 0.5 }}>〰️</Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: isStateActive(state, 0) ? "#FFF" : "#999",
            }}
          >
            Sem Reg.
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: isStateActive(state, 0) ? "rgba(255,255,255,0.8)" : "#AAA",
            }}
          >
            Overfitting
          </Typography>
        </Box>

        {/* L2 Regularization (State 1) */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 1) ? "#4A90A4" : "#E0E0E0",
            width: 100,
            textAlign: "center",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", mb: 0.5 }}>📏</Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: isStateActive(state, 1) ? "#FFF" : "#999",
            }}
          >
            L2 (Ridge)
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: isStateActive(state, 1) ? "rgba(255,255,255,0.8)" : "#AAA",
            }}
          >
            Smooth
          </Typography>
        </Box>

        {/* Dropout (State 2) */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 2) ? "#2ECC71" : "#E0E0E0",
            width: 100,
            textAlign: "center",
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", mb: 0.5 }}>🎲</Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: isStateActive(state, 2) ? "#FFF" : "#999",
            }}
          >
            Dropout
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: isStateActive(state, 2) ? "rgba(255,255,255,0.8)" : "#AAA",
            }}
          >
            Random Off
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

// =====================================================
// EXPORT MAP
// =====================================================
export const statefulVisualizations: Record<
  VisualizationType,
  React.ComponentType<StatefulMediaProps>
> = {
  "neural-network": NeuralNetworkMedia,
  "gradient-descent": GradientDescentMedia,
  "decision-tree": DecisionTreeMedia,
  "confusion-matrix": ConfusionMatrixMedia,
  "loss-chart": LossChartMedia,
  "data-flow": DataFlowMedia,
  "transformer": TransformerMedia,
  "attention": AttentionMedia,
  "convolution": ConvolutionMedia,
  "cnn-architecture": CNNArchitectureMedia,
  "pooling": PoolingMedia,
  "transfer-learning": TransferLearningMedia,
  "overfitting": OverfittingMedia,
  "rag-pipeline": RAGPipelineMedia,
  "embedding-space": EmbeddingSpaceMedia,
  "regularization": RegularizationMedia,
};
