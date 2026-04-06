"use client";

import { Box, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import type { VisualizationType, VisualizationConfig } from "@/types";

// =====================================================
// THEME PRESETS
// =====================================================
const COLOR_PRESETS = {
  default: ["#4A90A4", "#E85D3A", "#2ECC71", "#9B59B6", "#F39C12"],
  cool: ["#3498DB", "#2980B9", "#1ABC9C", "#16A085", "#48C9B0"],
  warm: ["#E74C3C", "#E85D3A", "#F39C12", "#F1C40F", "#D35400"],
  nature: ["#27AE60", "#2ECC71", "#1ABC9C", "#16A085", "#229954"],
  vibrant: ["#9B59B6", "#E91E63", "#00BCD4", "#FF5722", "#8BC34A"],
};

// =====================================================
// TYPES
// =====================================================
export interface StatefulMediaProps {
  /** Current state index (0 to totalStates - 1) */
  state: number;
  /** Progress within current state (0 to 1) for smooth transitions (optional, defaults to 1) */
  stateProgress?: number;
  /** CMS-driven configuration (optional - uses defaults if not provided) */
  config?: VisualizationConfig;
}

// Get colors from config or preset
function getColors(config?: VisualizationConfig): string[] {
  if (config?.theme?.preset === "custom" && config.theme.colors?.length) {
    return config.theme.colors;
  }
  const preset = config?.theme?.preset || "default";
  return COLOR_PRESETS[preset as keyof typeof COLOR_PRESETS] || COLOR_PRESETS.default;
}

// Utility: check if a state is active (reached)
const isStateActive = (currentState: number, targetState: number): boolean =>
  currentState >= targetState;

// Utility: get transition progress into a state
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
const getMediaCardStyle = (config?: VisualizationConfig) => ({
  background: config?.theme?.backgroundColor || "linear-gradient(135deg, #FDF9F3 0%, #FFFFFF 100%)",
  borderRadius: "16px",
  border: "2px solid #2D2D2D",
  boxShadow: "6px 6px 0px #2D2D2D",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  minHeight: "320px",
  position: "relative" as const,
  overflow: "hidden",
});

// =====================================================
// DEFAULT CONFIGURATIONS
// =====================================================
const DEFAULTS = {
  "neural-network": {
    title: "🧠 Rede Neural em Ação",
    layerLabels: ["Input", "Hidden 1", "Hidden 2", "Output"],
    layerSizes: [3, 4, 2, 1],
  },
  transformer: {
    title: "🤖 Transformer Architecture",
    blocks: ["Input", "Encoder", "Attention", "Decoder", "Output"],
  },
  attention: {
    title: "🔍 Self-Attention",
    queryLabels: ["Q₁", "Q₂", "Q₃"],
    keyLabels: ["K₁", "K₂", "K₃"],
  },
  "gradient-descent": {
    title: "⛰️ Gradient Descent",
    startLabel: "Start",
    endLabel: "Minimum",
    numSteps: 5,
  },
  "decision-tree": {
    title: "🌳 Decision Tree",
    rootLabel: "Root",
    depth: 3,
  },
  "confusion-matrix": {
    title: "📊 Matriz de Confusão",
    values: { truePositive: 42, falsePositive: 8, falseNegative: 5, trueNegative: 45 },
    labels: { positiveClass: "Real +", negativeClass: "Real -", predictedPositive: "Pred +", predictedNegative: "Pred -" },
  },
  "loss-chart": {
    title: "📉 Training Loss",
    xAxisLabel: "Epochs",
    yAxisLabel: "Loss",
    dataPoints: [
      { epoch: 0, loss: 2.5 },
      { epoch: 1, loss: 2.0 },
      { epoch: 2, loss: 1.4 },
      { epoch: 3, loss: 1.0 },
      { epoch: 4, loss: 0.7 },
    ],
  },
  "data-flow": {
    title: "🔄 ML Pipeline",
    steps: [
      { label: "Data", icon: "📊" },
      { label: "Clean", icon: "🧹" },
      { label: "Train", icon: "🎯" },
      { label: "Deploy", icon: "🚀" },
    ],
  },
  convolution: {
    title: "🔲 Convolução",
    inputSize: 5,
    filterSize: 3,
  },
  "cnn-architecture": {
    title: "🏗️ CNN Architecture",
    layers: [
      { label: "Input", type: "input", icon: "📷" },
      { label: "Conv", type: "conv", icon: "🔲" },
      { label: "Pool", type: "pool", icon: "⬇️" },
      { label: "FC", type: "fc", icon: "🔗" },
      { label: "Output", type: "output", icon: "📤" },
    ],
  },
  pooling: {
    title: "⬇️ Max Pooling",
    poolingType: "max",
    inputSize: 4,
    poolSize: 2,
  },
  "transfer-learning": {
    title: "🔄 Transfer Learning",
    baseModelLabel: "🧠 Pre-trained Base Model (ImageNet)",
    frozenLabel: "🔒 Frozen Layers",
    newHeadLabel: "🎯 New Task Head (Your Data)",
  },
  overfitting: {
    title: "📈 Overfitting",
    trainLabel: "Train",
    validationLabel: "Val",
    showOverfitZone: true,
  },
  "rag-pipeline": {
    title: "🔗 RAG Pipeline",
    steps: [
      { label: "Query", icon: "❓" },
      { label: "Retrieve", icon: "🔍" },
      { label: "Augment", icon: "📚" },
      { label: "Generate", icon: "✨" },
    ],
  },
  "embedding-space": {
    title: "🌌 Embedding Space",
    clusterLabels: ["Cluster A", "Cluster B", "Cluster C"],
    axisLabels: { x: "Dimension 1", y: "Dimension 2" },
  },
  regularization: {
    title: "🛡️ Regularização",
    techniques: [
      { name: "Sem Reg.", icon: "〰️", description: "Overfitting" },
      { name: "L2 (Ridge)", icon: "📏", description: "Smooth" },
      { name: "Dropout", icon: "🎲", description: "Random Off" },
    ],
  },
};

// =====================================================
// STATE COUNTS (how many states each visualization has)
// =====================================================
export const VISUALIZATION_STATES: Record<VisualizationType, number> = {
  "neural-network": 4,
  "gradient-descent": 5,
  "decision-tree": 4,
  "confusion-matrix": 4,
  "loss-chart": 5,
  "data-flow": 4,
  transformer: 5,
  attention: 3,
  convolution: 4,
  "cnn-architecture": 5,
  pooling: 3,
  "transfer-learning": 3,
  overfitting: 3,
  "rag-pipeline": 4,
  "embedding-space": 4,
  regularization: 3,
};

// =====================================================
// 1. NEURAL NETWORK - 4 states (one per layer)
// =====================================================
export const NeuralNetworkMedia = memo(function NeuralNetworkMedia({
  state,
  stateProgress,
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["neural-network"].title;
  const layerLabels = config?.neuralNetworkConfig?.layerLabels || DEFAULTS["neural-network"].layerLabels;
  const layerSizes = config?.neuralNetworkConfig?.layerSizes || DEFAULTS["neural-network"].layerSizes;

  // Generate layer positions based on sizes
  const layers = useMemo(() => {
    const result: { x: number; y: number }[][] = [];
    const xPositions = [50, 150, 250, 350];
    
    layerSizes.forEach((size, i) => {
      const layer: { x: number; y: number }[] = [];
      const startY = 160 - (size * 40) / 2;
      for (let j = 0; j < size; j++) {
        layer.push({ x: xPositions[i] || 50 + i * 100, y: startY + j * 60 });
      }
      result.push(layer);
    });
    
    return result;
  }, [layerSizes]);

  return (
    <Box sx={getMediaCardStyle(config)}>
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
        {title}
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
                stroke={colors[layerIdx % colors.length]}
                strokeWidth={2}
                opacity={connectionActive ? 0.6 : 0}
                style={{ transition: "all 0.5s ease-out" }}
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
                fill={layerActive ? colors[layerIdx % colors.length] : "#DDD"}
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
        {layerLabels.map((label, i) => (
          <text
            key={label}
            x={[50, 150, 250, 350][i] || 50 + i * 100}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS.attention.title;
  const queries = config?.attentionConfig?.queryLabels || DEFAULTS.attention.queryLabels;
  const keys = config?.attentionConfig?.keyLabels || DEFAULTS.attention.keyLabels;
  
  const attentionWeights = [
    [0.7, 0.2, 0.1],
    [0.1, 0.8, 0.1],
    [0.2, 0.2, 0.6],
  ];

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
                fill={active ? colors[0] : "#E0E0E0"}
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
                fill={active ? colors[1] : "#E0E0E0"}
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
            const weight = attentionWeights[qi]?.[ki] || 0.5;
            return (
              <line
                key={`att-${qi}-${ki}`}
                x1={100}
                y1={85 + qi * 70}
                x2={active ? 260 : 100}
                y2={active ? 85 + ki * 70 : 85 + qi * 70}
                stroke={colors[3] || "#9B59B6"}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS.transformer.title;
  const blockLabels = config?.transformerConfig?.blocks?.map(b => b.label) || DEFAULTS.transformer.blocks;

  const blocks = blockLabels.map((label, i) => ({
    label,
    y: 260 - i * 60,
    color: colors[i % colors.length],
  }));

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["gradient-descent"].title;
  const startLabel = config?.gradientDescentConfig?.startLabel || DEFAULTS["gradient-descent"].startLabel;
  const endLabel = config?.gradientDescentConfig?.endLabel || DEFAULTS["gradient-descent"].endLabel;
  const numSteps = config?.gradientDescentConfig?.numSteps || DEFAULTS["gradient-descent"].numSteps;

  // Generate positions based on numSteps
  const positions = useMemo(() => {
    const result = [];
    for (let i = 0; i < numSteps; i++) {
      const t = i / (numSteps - 1);
      result.push({
        x: 50 + t * 210,
        y: 80 + t * 170,
      });
    }
    return result;
  }, [numSteps]);

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
              stroke={colors[1]}
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
                fill={isCurrent ? colors[1] : reached ? colors[0] : "#DDD"}
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
          {startLabel}
        </text>
        <text x={280} y={280} textAnchor="middle" fontSize="12" fill="#666">
          {endLabel}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["decision-tree"].title;
  const rootLabel = config?.decisionTreeConfig?.rootLabel || DEFAULTS["decision-tree"].rootLabel;

  const levels = [
    [{ x: 175, y: 40, label: rootLabel }],
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
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
                stroke={colors[0]}
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
                stroke={colors[1]}
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
                  stroke={colors[2]}
                  strokeWidth={2}
                  opacity={0.6}
                />
              );
            });
          })}

        {/* Draw nodes */}
        {levels.map((level, levelIdx) => {
          const active = isStateActive(state, levelIdx);

          return level.map((node, nodeIdx) => (
            <g key={`node-${levelIdx}-${nodeIdx}`}>
              {levelIdx < 3 ? (
                <rect
                  x={node.x - 25}
                  y={node.y - 18}
                  width={50}
                  height={36}
                  rx={6}
                  fill={active ? colors[levelIdx % colors.length] : "#E0E0E0"}
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
  config,
}: StatefulMediaProps) {
  const title = config?.title || DEFAULTS["confusion-matrix"].title;
  const values = config?.confusionMatrixConfig?.values || DEFAULTS["confusion-matrix"].values;
  const labels = config?.confusionMatrixConfig?.labels || DEFAULTS["confusion-matrix"].labels;

  const cells = [
    { label: "TP", value: values.truePositive, color: "#2ECC71" },
    { label: "FP", value: values.falsePositive, color: "#E74C3C" },
    { label: "FN", value: values.falseNegative, color: "#E74C3C" },
    { label: "TN", value: values.trueNegative, color: "#2ECC71" },
  ];

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 0.5 }}>
        {/* Header */}
        <Box sx={{ p: 1 }} />
        <Box sx={{ p: 1, textAlign: "center", fontWeight: "bold", fontSize: "0.8rem" }}>
          {labels.predictedPositive}
        </Box>
        <Box sx={{ p: 1, textAlign: "center", fontWeight: "bold", fontSize: "0.8rem" }}>
          {labels.predictedNegative}
        </Box>

        {/* Row 1 */}
        <Box sx={{ p: 1, fontWeight: "bold", fontSize: "0.8rem" }}>{labels.positiveClass}</Box>
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
        <Box sx={{ p: 1, fontWeight: "bold", fontSize: "0.8rem" }}>{labels.negativeClass}</Box>
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["loss-chart"].title;
  const xAxisLabel = config?.lossChartConfig?.xAxisLabel || DEFAULTS["loss-chart"].xAxisLabel;
  const yAxisLabel = config?.lossChartConfig?.yAxisLabel || DEFAULTS["loss-chart"].yAxisLabel;
  const configPoints = config?.lossChartConfig?.dataPoints;

  const points = useMemo(() => {
    if (configPoints?.length) {
      return configPoints.map((p, i) => ({
        x: 30 + (i / (configPoints.length - 1)) * 240,
        y: 40 + (1 - p.loss / 3) * 180,
        loss: p.loss,
      }));
    }
    return DEFAULTS["loss-chart"].dataPoints.map((p, i) => ({
      x: 30 + (i / 4) * 240,
      y: 40 + (1 - p.loss / 3) * 180,
      loss: p.loss,
    }));
  }, [configPoints]);

  const pathSegments = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${280 - p.y}`;
    return `L ${p.x} ${280 - p.y}`;
  });

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
          stroke={colors[1]}
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
                fill={active ? colors[1] : "#DDD"}
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
                  {p.loss.toFixed(1)}
                </text>
              )}
            </g>
          );
        })}

        {/* Labels */}
        <text x={155} y={275} textAnchor="middle" fontSize="12" fill="#666">
          {xAxisLabel}
        </text>
        <text
          x={10}
          y={140}
          textAnchor="middle"
          fontSize="12"
          fill="#666"
          transform="rotate(-90, 10, 140)"
        >
          {yAxisLabel}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["data-flow"].title;
  
  const pipelineSteps = config?.pipelineConfig?.steps;
  const steps = useMemo(() => {
    if (pipelineSteps?.length) {
      return pipelineSteps.map((s, i) => ({
        label: s.label,
        x: 50 + i * 80,
        icon: s.icon || "📦",
      }));
    }
    return DEFAULTS["data-flow"].steps.map((s, i) => ({
      label: s.label,
      x: 50 + i * 80,
      icon: s.icon,
    }));
  }, [pipelineSteps]);

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
                stroke={colors[0]}
                strokeWidth={3}
                style={{ transition: "all 0.5s ease-out" }}
              />
              {active && (
                <polygon
                  points={`${next.x - 35},95 ${next.x - 25},100 ${next.x - 35},105`}
                  fill={colors[0]}
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
                fill={active ? colors[0] : "#E0E0E0"}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS.convolution.title;
  const inputSize = config?.convolutionConfig?.inputSize || DEFAULTS.convolution.inputSize;
  const filterSize = config?.convolutionConfig?.filterSize || DEFAULTS.convolution.filterSize;

  const inputGrid = useMemo(() => {
    const grid = [];
    for (let i = 0; i < inputSize; i++) {
      const row = [];
      for (let j = 0; j < inputSize; j++) {
        row.push(i + j + 1);
      }
      grid.push(row);
    }
    return grid;
  }, [inputSize]);

  const outputSize = inputSize - filterSize + 1;
  const filterPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < outputSize; i++) {
      for (let j = 0; j < outputSize; j++) {
        positions.push({ row: i, col: j });
      }
    }
    return positions.slice(0, 4); // Limit to 4 states
  }, [outputSize]);

  const outputValues = [36, 54, 72, 90];

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* Input grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${inputSize}, 28px)`,
            gap: "2px",
            position: "relative",
          }}
        >
          {inputGrid.map((row, ri) =>
            row.map((val, ci) => {
              const currentFilter = filterPositions[Math.min(state, filterPositions.length - 1)];
              const isInFilter =
                ri >= currentFilter.row &&
                ri < currentFilter.row + filterSize &&
                ci >= currentFilter.col &&
                ci < currentFilter.col + filterSize;

              return (
                <Box
                  key={`${ri}-${ci}`}
                  sx={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isInFilter ? colors[1] : "#F5F5F5",
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
            gridTemplateColumns: `repeat(${outputSize}, 36px)`,
            gap: "4px",
          }}
        >
          {filterPositions.map((_, i) => {
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
                  bgcolor: active ? colors[0] : "#E0E0E0",
                  color: active ? "#FFF" : "#999",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  borderRadius: 1,
                  border: "2px solid #2D2D2D",
                  transition: "all 0.4s ease-out",
                }}
              >
                {active ? outputValues[i] || "?" : "?"}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["cnn-architecture"].title;
  
  const cnnLayers = config?.cnnConfig?.layers;
  const layers = useMemo(() => {
    if (cnnLayers?.length) {
      return cnnLayers.map((l, i) => ({
        label: l.label,
        type: l.type,
        color: colors[i % colors.length],
        icon: l.icon || ["📷", "🔲", "⬇️", "🔗", "📤"][i] || "📦",
      }));
    }
    return DEFAULTS["cnn-architecture"].layers.map((l, i) => ({
      ...l,
      color: colors[i % colors.length],
    }));
  }, [cnnLayers, colors]);

  const heights = [80, 70, 50, 40, 30];

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
        {layers.map((layer, i) => {
          const active = isStateActive(state, i);

          return (
            <Box key={layer.label} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 50,
                  height: heights[i] || 50,
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
                    {layer.icon}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS.pooling.title;
  const poolingType = config?.poolingConfig?.poolingType || DEFAULTS.pooling.poolingType;

  const inputData = [
    [4, 2, 1, 3],
    [1, 5, 3, 2],
    [2, 3, 6, 1],
    [1, 2, 1, 4],
  ];

  const pooledData = poolingType === "max" 
    ? [[5, 3], [3, 6]] 
    : [[3, 2.25], [2, 3]]; // avg pooling

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
            const quadrantVals = inputData
              .slice(Math.floor(row / 2) * 2, Math.floor(row / 2) * 2 + 2)
              .flatMap((r) => r.slice(Math.floor(col / 2) * 2, Math.floor(col / 2) * 2 + 2));
            const isMax = poolingType === "max" 
              ? val === Math.max(...quadrantVals)
              : val === quadrantVals[0]; // Just highlight first for avg
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
                  bgcolor: highlightMax ? colors[1] : "#F5F5F5",
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
                bgcolor: isStateActive(state, 2) ? colors[0] : "#E0E0E0",
                color: isStateActive(state, 2) ? "#FFF" : "#999",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 1,
                border: "2px solid #2D2D2D",
                transition: "all 0.4s ease-out",
              }}
            >
              {isStateActive(state, 2) ? (typeof val === 'number' ? val : val) : "?"}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["transfer-learning"].title;
  const baseModelLabel = config?.transferLearningConfig?.baseModelLabel || DEFAULTS["transfer-learning"].baseModelLabel;
  const frozenLabel = config?.transferLearningConfig?.frozenLabel || DEFAULTS["transfer-learning"].frozenLabel;
  const newHeadLabel = config?.transferLearningConfig?.newHeadLabel || DEFAULTS["transfer-learning"].newHeadLabel;

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        {/* Base model (State 0) */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 0) ? colors[0] : "#E0E0E0",
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
            {baseModelLabel}
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
            {frozenLabel}
          </Typography>
        </Box>

        {/* New head (State 2) */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "2px solid #2D2D2D",
            bgcolor: isStateActive(state, 2) ? colors[1] : "#E0E0E0",
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
            {newHeadLabel}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS.overfitting.title;
  const trainLabel = config?.overfittingConfig?.trainLabel || DEFAULTS.overfitting.trainLabel;
  const validationLabel = config?.overfittingConfig?.validationLabel || DEFAULTS.overfitting.validationLabel;
  const showOverfitZone = config?.overfittingConfig?.showOverfitZone ?? DEFAULTS.overfitting.showOverfitZone;

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>
      <Box component="svg" viewBox="0 0 300 200" sx={{ width: "100%", maxWidth: 280 }}>
        {/* Axes */}
        <line x1={40} y1={170} x2={280} y2={170} stroke="#2D2D2D" strokeWidth={2} />
        <line x1={40} y1={170} x2={40} y2={20} stroke="#2D2D2D" strokeWidth={2} />

        {/* Training curve (State 0) */}
        <path
          d="M 50 150 Q 100 100 150 70 Q 200 50 260 30"
          fill="none"
          stroke={isStateActive(state, 0) ? colors[0] : "#DDD"}
          strokeWidth={3}
          style={{ transition: "stroke 0.4s ease-out" }}
        />

        {/* Validation curve (State 1) */}
        <path
          d="M 50 155 Q 100 110 150 90 Q 200 100 260 140"
          fill="none"
          stroke={isStateActive(state, 1) ? colors[1] : "#DDD"}
          strokeWidth={3}
          strokeDasharray={isStateActive(state, 1) ? "5,3" : "none"}
          style={{ transition: "stroke 0.4s ease-out" }}
        />

        {/* Overfitting zone highlight (State 2) */}
        {isStateActive(state, 2) && showOverfitZone && (
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
          <line x1={60} y1={185} x2={80} y2={185} stroke={colors[0]} strokeWidth={2} />
          <text x={85} y={188} fontSize="10" fill="#666">
            {trainLabel}
          </text>
        </g>
        <g opacity={isStateActive(state, 1) ? 1 : 0.3}>
          <line x1={130} y1={185} x2={150} y2={185} stroke={colors[1]} strokeWidth={2} />
          <text x={155} y={188} fontSize="10" fill="#666">
            {validationLabel}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["rag-pipeline"].title;
  
  const ragSteps = config?.pipelineConfig?.steps;
  const steps = useMemo(() => {
    if (ragSteps?.length) {
      return ragSteps.map((s, i) => ({
        label: s.label,
        icon: s.icon || "📦",
        color: colors[i % colors.length],
      }));
    }
    return DEFAULTS["rag-pipeline"].steps.map((s, i) => ({
      ...s,
      color: colors[i % colors.length],
    }));
  }, [ragSteps, colors]);

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
  config,
}: StatefulMediaProps) {
  const colors = getColors(config);
  const title = config?.title || DEFAULTS["embedding-space"].title;
  const clusterLabels = config?.embeddingConfig?.clusterLabels || DEFAULTS["embedding-space"].clusterLabels;
  const axisLabels = config?.embeddingConfig?.axisLabels || DEFAULTS["embedding-space"].axisLabels;

  // Points in 2D embedding space
  const clusters = clusterLabels.map((label, i) => ({
    points: [
      { x: 60 + i * 70, y: 80 + i * 50 },
      { x: 80 + i * 70, y: 100 + i * 50 },
      { x: 70 + i * 70, y: 120 + i * 50 },
    ],
    color: colors[i % colors.length],
    label,
  }));

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
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
              {cluster.label}
            </text>
          ))}

        {/* Axes labels */}
        <text x={150} y={268} textAnchor="middle" fontSize="11" fill="#666">
          {axisLabels.x}
        </text>
        <text x={15} y={140} textAnchor="middle" fontSize="11" fill="#666" transform="rotate(-90, 15, 140)">
          {axisLabels.y}
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
  config,
}: StatefulMediaProps) {
  const title = config?.title || DEFAULTS.regularization.title;
  
  const regTechniques = config?.regularizationConfig?.techniques;
  const techniques = useMemo(() => {
    if (regTechniques?.length) {
      return regTechniques.map((t, i) => ({
        name: t.name,
        icon: t.icon || "📦",
        description: t.description || "",
        color: i === 0 ? "#E74C3C" : i === 1 ? "#4A90A4" : "#2ECC71",
      }));
    }
    return DEFAULTS.regularization.techniques.map((t, i) => ({
      ...t,
      color: i === 0 ? "#E74C3C" : i === 1 ? "#4A90A4" : "#2ECC71",
    }));
  }, [regTechniques]);

  return (
    <Box sx={getMediaCardStyle(config)}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.4rem",
          mb: 2,
          color: "primary.dark",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        {techniques.map((tech, i) => {
          const active = isStateActive(state, i);
          return (
            <Box
              key={tech.name}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "2px solid #2D2D2D",
                bgcolor: active ? tech.color : "#E0E0E0",
                width: 100,
                textAlign: "center",
                transition: "all 0.4s ease-out",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem", mb: 0.5 }}>{tech.icon}</Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  color: active ? "#FFF" : "#999",
                }}
              >
                {tech.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  color: active ? "rgba(255,255,255,0.8)" : "#AAA",
                }}
              >
                {tech.description}
              </Typography>
            </Box>
          );
        })}
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
