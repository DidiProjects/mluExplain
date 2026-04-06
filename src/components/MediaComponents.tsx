"use client";

import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// Animations
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const draw = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

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

// 1. Neural Network Visualization
export function NeuralNetworkMedia() {
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
      <Box
        component="svg"
        viewBox="0 0 400 320"
        sx={{
          width: "100%",
          maxWidth: 350,
          height: "auto",
        }}
      >
        {/* Connections */}
        {nodes.slice(0, 3).map((n1, i) =>
          nodes.slice(3, 7).map((n2, j) => (
            <line
              key={`l1-${i}-${j}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#E85D3A"
              strokeWidth="1.5"
              opacity="0.4"
            />
          ))
        )}
        {nodes.slice(3, 7).map((n1, i) =>
          nodes.slice(7, 9).map((n2, j) => (
            <line
              key={`l2-${i}-${j}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#E85D3A"
              strokeWidth="1.5"
              opacity="0.4"
            />
          ))
        )}
        {nodes.slice(7, 9).map((n1, i) => (
          <line
            key={`l3-${i}`}
            x1={n1.x}
            y1={n1.y}
            x2={nodes[9].x}
            y2={nodes[9].y}
            stroke="#E85D3A"
            strokeWidth="1.5"
            opacity="0.4"
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="18"
              fill="#FDF9F3"
              stroke="#2D2D2D"
              strokeWidth="2"
              style={{
                animation: `${pulse} ${1.5 + node.layer * 0.3}s ease-in-out infinite`,
                animationDelay: `${node.layer * 0.2}s`,
              }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#E85D3A"
              style={{
                animation: `${pulse} ${1.5 + node.layer * 0.3}s ease-in-out infinite`,
                animationDelay: `${node.layer * 0.2}s`,
              }}
            />
          </g>
        ))}
        {/* Layer labels */}
        <text x="50" y="290" textAnchor="middle" fontSize="12" fill="#6B6B6B">
          Input
        </text>
        <text x="150" y="290" textAnchor="middle" fontSize="12" fill="#6B6B6B">
          Hidden 1
        </text>
        <text x="250" y="290" textAnchor="middle" fontSize="12" fill="#6B6B6B">
          Hidden 2
        </text>
        <text x="350" y="290" textAnchor="middle" fontSize="12" fill="#6B6B6B">
          Output
        </text>
      </Box>
    </Box>
  );
}

// 2. Gradient Descent Visualization
export function GradientDescentMedia() {
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
        {/* Loss curve */}
        <path
          d="M 30 50 Q 80 200 150 180 Q 220 160 280 220 Q 320 250 340 240"
          fill="none"
          stroke="#E85D3A"
          strokeWidth="3"
          strokeDasharray="1000"
          style={{
            animation: `${draw} 3s ease-in-out infinite`,
          }}
        />
        {/* Ball rolling down */}
        <circle
          cx="80"
          cy="160"
          r="12"
          fill="#2D2D2D"
          style={{
            animation: `${float} 2s ease-in-out infinite`,
          }}
        />
        <circle
          cx="180"
          cy="175"
          r="12"
          fill="#2D2D2D"
          opacity="0.6"
        />
        <circle
          cx="260"
          cy="210"
          r="12"
          fill="#2D2D2D"
          opacity="0.3"
        />
        {/* Arrows */}
        <path d="M 95 165 L 165 175" stroke="#6B6B6B" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 195 180 L 245 205" stroke="#6B6B6B" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#6B6B6B" />
          </marker>
        </defs>
        {/* Axis */}
        <line x1="20" y1="260" x2="340" y2="260" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="20" y1="260" x2="20" y2="30" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="278" textAnchor="middle" fontSize="12" fill="#6B6B6B">
          Parâmetros
        </text>
        <text x="15" y="145" textAnchor="middle" fontSize="12" fill="#6B6B6B" transform="rotate(-90, 15, 145)">
          Loss
        </text>
      </Box>
      <Typography
        variant="body2"
        sx={{ mt: 1, color: "text.secondary", textAlign: "center", fontSize: "0.85rem" }}
      >
        A bolinha &ldquo;desce&rdquo; em direção ao mínimo
      </Typography>
    </Box>
  );
}

// 3. Decision Tree Visualization
export function DecisionTreeMedia() {
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
        {/* Connections */}
        <line x1="180" y1="50" x2="90" y2="120" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="180" y1="50" x2="270" y2="120" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="90" y1="140" x2="50" y2="210" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="90" y1="140" x2="130" y2="210" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="270" y1="140" x2="230" y2="210" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="270" y1="140" x2="310" y2="210" stroke="#2D2D2D" strokeWidth="2" />

        {/* Root node */}
        <rect x="130" y="25" width="100" height="40" rx="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="52" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">
          Idade {">"} 30?
        </text>

        {/* Level 1 nodes */}
        <rect x="40" y="105" width="100" height="40" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
        <text x="90" y="132" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
          Renda {">"} 50k?
        </text>
        <rect x="220" y="105" width="100" height="40" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
        <text x="270" y="132" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">
          Casado?
        </text>

        {/* Leaf nodes */}
        <rect x="10" y="200" width="80" height="35" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
        <text x="50" y="223" textAnchor="middle" fontSize="11" fill="white">✓ Aprovar</text>
        <rect x="90" y="200" width="80" height="35" rx="8" fill="#f44336" stroke="#2D2D2D" strokeWidth="2" />
        <text x="130" y="223" textAnchor="middle" fontSize="11" fill="white">✗ Rejeitar</text>
        <rect x="190" y="200" width="80" height="35" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
        <text x="230" y="223" textAnchor="middle" fontSize="11" fill="white">✓ Aprovar</text>
        <rect x="270" y="200" width="80" height="35" rx="8" fill="#f44336" stroke="#2D2D2D" strokeWidth="2" />
        <text x="310" y="223" textAnchor="middle" fontSize="11" fill="white">✗ Rejeitar</text>

        {/* Edge labels */}
        <text x="120" y="80" fontSize="10" fill="#4CAF50" fontWeight="bold">Sim</text>
        <text x="225" y="80" fontSize="10" fill="#f44336" fontWeight="bold">Não</text>
      </Box>
    </Box>
  );
}

// 4. Confusion Matrix
export function ConfusionMatrixMedia() {
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
          }}
        >
          Real
        </Box>

        {/* Cells */}
        <Box
          sx={{
            gridColumn: "2",
            gridRow: "2",
            bgcolor: "#4CAF50",
            color: "white",
            p: 2,
            textAlign: "center",
            borderRadius: "8px 0 0 0",
            border: "2px solid #2D2D2D",
            animation: `${fadeInUp} 0.5s ease-out`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>85</Typography>
          <Typography variant="caption">VP</Typography>
        </Box>
        <Box
          sx={{
            gridColumn: "3",
            gridRow: "2",
            bgcolor: "#f44336",
            color: "white",
            p: 2,
            textAlign: "center",
            borderRadius: "0 8px 0 0",
            border: "2px solid #2D2D2D",
            animation: `${fadeInUp} 0.5s ease-out 0.1s both`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>5</Typography>
          <Typography variant="caption">FP</Typography>
        </Box>
        <Box
          sx={{
            gridColumn: "2",
            gridRow: "3",
            bgcolor: "#FF9800",
            color: "white",
            p: 2,
            textAlign: "center",
            borderRadius: "0 0 0 8px",
            border: "2px solid #2D2D2D",
            animation: `${fadeInUp} 0.5s ease-out 0.2s both`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>10</Typography>
          <Typography variant="caption">FN</Typography>
        </Box>
        <Box
          sx={{
            gridColumn: "3",
            gridRow: "3",
            bgcolor: "#4CAF50",
            color: "white",
            p: 2,
            textAlign: "center",
            borderRadius: "0 0 8px 0",
            border: "2px solid #2D2D2D",
            animation: `${fadeInUp} 0.5s ease-out 0.3s both`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>100</Typography>
          <Typography variant="caption">VN</Typography>
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{ mt: 2, color: "text.secondary", textAlign: "center", fontSize: "0.85rem" }}
      >
        Acurácia: 92.5%
      </Typography>
    </Box>
  );
}

// 5. Loss Chart Animation
export function LossChartMedia() {
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

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${200 - p.y}`).join(" ");

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
          />
        ))}

        {/* Training loss line */}
        <path
          d={pathD}
          fill="none"
          stroke="#E85D3A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1000"
          style={{
            animation: `${draw} 4s ease-out infinite`,
          }}
        />

        {/* Validation loss (slightly offset) */}
        <path
          d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${200 - p.y + 15 + Math.sin(i) * 5}`).join(" ")}
          fill="none"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5,5"
          opacity="0.6"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={200 - p.y}
            r="5"
            fill="#E85D3A"
            stroke="#2D2D2D"
            strokeWidth="1.5"
            style={{
              animation: `${pulse} 2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}

        {/* Axis */}
        <line x1="25" y1="200" x2="320" y2="200" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="25" y1="200" x2="25" y2="30" stroke="#2D2D2D" strokeWidth="2" />

        {/* Labels */}
        <text x="170" y="218" textAnchor="middle" fontSize="11" fill="#6B6B6B">
          Épocas
        </text>
        <text x="15" y="115" textAnchor="middle" fontSize="11" fill="#6B6B6B" transform="rotate(-90, 15, 115)">
          Acurácia
        </text>

        {/* Legend */}
        <rect x="230" y="15" width="100" height="45" rx="6" fill="white" stroke="#E0E0E0" />
        <line x1="240" y1="30" x2="260" y2="30" stroke="#E85D3A" strokeWidth="2" />
        <text x="265" y="33" fontSize="10" fill="#6B6B6B">Treino</text>
        <line x1="240" y1="48" x2="260" y2="48" stroke="#2D2D2D" strokeWidth="2" strokeDasharray="3,3" />
        <text x="265" y="51" fontSize="10" fill="#6B6B6B">Validação</text>
      </Box>
    </Box>
  );
}

// 6. Data Flow Diagram
export function DataFlowMedia() {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { icon: "📥", label: "Coleta" },
          { icon: "🧹", label: "Limpeza" },
          { icon: "🔧", label: "Transform" },
          { icon: "🎯", label: "Modelo" },
          { icon: "📊", label: "Output" },
        ].map((step, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1.5,
                bgcolor: i === 3 ? "secondary.main" : "background.paper",
                color: i === 3 ? "white" : "text.primary",
                borderRadius: 2,
                border: "2px solid #2D2D2D",
                boxShadow: "3px 3px 0px #2D2D2D",
                minWidth: 70,
                animation: `${fadeInUp} 0.5s ease-out ${i * 0.15}s both`,
              }}
            >
              <Box sx={{ fontSize: "1.5rem" }}>{step.icon}</Box>
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.7rem" }}>
                {step.label}
              </Typography>
            </Box>
            {i < 4 && (
              <Box
                sx={{
                  mx: 0.5,
                  color: "secondary.main",
                  fontWeight: "bold",
                  animation: `${pulse} 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                →
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export const mediaComponents = {
  NeuralNetworkMedia,
  GradientDescentMedia,
  DecisionTreeMedia,
  ConfusionMatrixMedia,
  LossChartMedia,
  DataFlowMedia,
};

// 7. Transformer Architecture
export function TransformerMedia() {
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
        <rect x="130" y="290" width="100" height="35" rx="6" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="312" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Input Embed</text>

        {/* Multi-Head Attention */}
        <rect x="130" y="220" width="100" height="50" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="240" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Multi-Head</text>
        <text x="180" y="255" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Attention</text>

        {/* Feed Forward */}
        <rect x="130" y="140" width="100" height="50" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="160" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Feed</text>
        <text x="180" y="175" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Forward</text>

        {/* Output */}
        <rect x="130" y="60" width="100" height="35" rx="6" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="2" />
        <text x="180" y="82" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Output</text>

        {/* Arrows */}
        <line x1="180" y1="290" x2="180" y2="275" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowT)" />
        <line x1="180" y1="220" x2="180" y2="195" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowT)" />
        <line x1="180" y1="140" x2="180" y2="100" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowT)" />

        {/* Skip Connections */}
        <path d="M 125 245 Q 80 245 80 170 Q 80 165 125 165" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowT)" />
        <path d="M 235 245 Q 280 245 280 170 Q 280 165 235 165" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowT)" />

        {/* Labels */}
        <text x="55" y="205" fontSize="9" fill="#6B6B6B">Add &</text>
        <text x="55" y="215" fontSize="9" fill="#6B6B6B">Norm</text>
        <text x="290" y="205" fontSize="9" fill="#6B6B6B">Add &</text>
        <text x="290" y="215" fontSize="9" fill="#6B6B6B">Norm</text>

        {/* N× */}
        <text x="255" y="180" fontSize="14" fill="#E85D3A" fontWeight="bold">N×</text>

        <defs>
          <marker id="arrowT" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
}

// 8. Self-Attention Visualization
export function AttentionMedia() {
  const words = ["O", "gato", "sentou", "no", "tapete"];
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
        {words.map((word, i) => (
          <g key={`left-${i}`}>
            <rect x="20" y={40 + i * 45} width="60" height="30" rx="6" fill="#FDF9F3" stroke="#2D2D2D" strokeWidth="1.5" />
            <text x="50" y={60 + i * 45} textAnchor="middle" fontSize="11" fill="#2D2D2D" fontWeight="600">{word}</text>
          </g>
        ))}

        {/* Words on right */}
        {words.map((word, i) => (
          <g key={`right-${i}`}>
            <rect x="240" y={40 + i * 45} width="60" height="30" rx="6" fill="#FDF9F3" stroke="#2D2D2D" strokeWidth="1.5" />
            <text x="270" y={60 + i * 45} textAnchor="middle" fontSize="11" fill="#2D2D2D" fontWeight="600">{word}</text>
          </g>
        ))}

        {/* Attention lines - "gato" attending to other words */}
        <line x1="80" y1="100" x2="240" y2="55" stroke="#E85D3A" strokeWidth="1" opacity="0.3" />
        <line x1="80" y1="100" x2="240" y2="100" stroke="#E85D3A" strokeWidth="3" opacity="0.9" />
        <line x1="80" y1="100" x2="240" y2="145" stroke="#E85D3A" strokeWidth="1.5" opacity="0.5" />
        <line x1="80" y1="100" x2="240" y2="190" stroke="#E85D3A" strokeWidth="2" opacity="0.7" />
        <line x1="80" y1="100" x2="240" y2="235" stroke="#E85D3A" strokeWidth="1.5" opacity="0.6" />
      </Box>
      <Typography
        variant="body2"
        sx={{ mt: 1, color: "text.secondary", textAlign: "center", fontSize: "0.8rem" }}
      >
        Linhas mais grossas = maior atenção
      </Typography>
    </Box>
  );
}

// 9. CNN Convolution
export function ConvolutionMedia() {
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
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`input-${row}-${col}`}
              x={20 + col * 28}
              y={30 + row * 28}
              width="26"
              height="26"
              fill={row >= 1 && row <= 3 && col >= 1 && col <= 3 ? "#FF7F5C" : "#FDF9F3"}
              stroke="#2D2D2D"
              strokeWidth="1"
              rx="2"
            />
          ))
        )}

        {/* Kernel */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`kernel-${row}-${col}`}
              x={180 + col * 24}
              y={60 + row * 24}
              width="22"
              height="22"
              fill="#E85D3A"
              stroke="#2D2D2D"
              strokeWidth="1.5"
              rx="2"
            />
          ))
        )}

        {/* Output */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`output-${row}-${col}`}
              x={280 + col * 24}
              y={60 + row * 24}
              width="22"
              height="22"
              fill={row === 1 && col === 1 ? "#4CAF50" : "#FDF9F3"}
              stroke="#2D2D2D"
              strokeWidth="1"
              rx="2"
            />
          ))
        )}

        {/* Labels */}
        <text x="90" y="200" textAnchor="middle" fontSize="11" fill="#6B6B6B">Input 5×5</text>
        <text x="213" y="170" textAnchor="middle" fontSize="11" fill="#6B6B6B">Kernel 3×3</text>
        <text x="313" y="170" textAnchor="middle" fontSize="11" fill="#6B6B6B">Output 3×3</text>

        {/* Arrows */}
        <path d="M 155 90 L 175 90" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowC)" />
        <path d="M 255 90 L 275 90" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowC)" />

        {/* Multiply symbol */}
        <text x="165" y="95" fontSize="16" fill="#E85D3A">×</text>
        <text x="265" y="95" fontSize="16" fill="#4CAF50">=</text>

        <defs>
          <marker id="arrowC" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
}

// 10. CNN Architecture
export function CNNArchitectureMedia() {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
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
          }}
        >
          🐱
        </Box>

        <Box sx={{ color: "text.secondary", mx: 0.5 }}>→</Box>

        {/* Conv layers */}
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                width: 30,
                height: 50 - i * 8,
                bgcolor: "#FF7F5C",
                border: "2px solid #2D2D2D",
                borderRadius: 1,
                mb: 0.5,
              }}
            />
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>Conv{i}</Typography>
          </Box>
        ))}

        <Box sx={{ color: "text.secondary", mx: 0.5 }}>→</Box>

        {/* Flatten */}
        <Box
          sx={{
            width: 15,
            height: 60,
            bgcolor: "#4CAF50",
            border: "2px solid #2D2D2D",
            borderRadius: 1,
          }}
        />

        <Box sx={{ color: "text.secondary", mx: 0.5 }}>→</Box>

        {/* FC layers */}
        {[1, 2].map((i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>FC{i}</Typography>
          </Box>
        ))}

        <Box sx={{ color: "text.secondary", mx: 0.5 }}>→</Box>

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
          }}
        >
          Gato ✓
        </Box>
      </Box>
    </Box>
  );
}

// 11. Pooling Operation
export function PoolingMedia() {
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
        {[[1, 3, 2, 1], [4, 6, 5, 2], [7, 2, 1, 3], [2, 5, 4, 1]].map((row, i) =>
          row.map((val, j) => (
            <g key={`in-${i}-${j}`}>
              <rect
                x={30 + j * 40}
                y={30 + i * 40}
                width="38"
                height="38"
                fill={(i < 2 && j < 2) ? "#FFE0B2" : (i < 2 && j >= 2) ? "#E3F2FD" : (i >= 2 && j < 2) ? "#E8F5E9" : "#FCE4EC"}
                stroke="#2D2D2D"
                strokeWidth="1"
              />
              <text x={49 + j * 40} y={55 + i * 40} textAnchor="middle" fontSize="14" fill="#2D2D2D" fontWeight="600">{val}</text>
            </g>
          ))
        )}

        {/* Arrow */}
        <path d="M 200 100 L 230 100" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowP)" />
        <text x="215" y="90" fontSize="12" fill="#6B6B6B">max</text>

        {/* Output 2x2 */}
        {[[6, 5], [7, 4]].map((row, i) =>
          row.map((val, j) => (
            <g key={`out-${i}-${j}`}>
              <rect
                x={240 + j * 40}
                y={50 + i * 40}
                width="38"
                height="38"
                fill={(i === 0 && j === 0) ? "#FFE0B2" : (i === 0 && j === 1) ? "#E3F2FD" : (i === 1 && j === 0) ? "#E8F5E9" : "#FCE4EC"}
                stroke="#2D2D2D"
                strokeWidth="2"
              />
              <text x={259 + j * 40} y={75 + i * 40} textAnchor="middle" fontSize="16" fill="#2D2D2D" fontWeight="bold">{val}</text>
            </g>
          ))
        )}

        <defs>
          <marker id="arrowP" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
}

// 12. Transfer Learning
export function TransferLearningMedia() {
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
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 30,
                  height: 40,
                  bgcolor: "#4CAF50",
                  border: "2px solid #2D2D2D",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6rem",
                  color: "white",
                }}
              >
                ❄️
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: 50,
              height: 40,
              bgcolor: "#E85D3A",
              border: "2px solid #2D2D2D",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              color: "white",
              fontWeight: 600,
            }}
          >
            🔥 Novo
          </Box>
        </Box>

        <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary", textAlign: "center" }}>
          ❄️ Camadas congeladas (ImageNet)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary", textAlign: "center" }}>
          🔥 Camada treinável (seu problema)
        </Typography>
      </Box>
    </Box>
  );
}

// 13. Overfitting illustration
export function OverfittingMedia() {
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
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{ width: 80, height: 80 }}
          >
            <circle cx="20" cy="70" r="5" fill="#E85D3A" />
            <circle cx="30" cy="40" r="5" fill="#E85D3A" />
            <circle cx="50" cy="55" r="5" fill="#E85D3A" />
            <circle cx="70" cy="30" r="5" fill="#E85D3A" />
            <circle cx="85" cy="60" r="5" fill="#E85D3A" />
            <line x1="10" y1="60" x2="90" y2="50" stroke="#2D2D2D" strokeWidth="2" />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>Underfitting</Typography>
        </Box>

        {/* Good fit */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{ width: 80, height: 80 }}
          >
            <circle cx="20" cy="70" r="5" fill="#4CAF50" />
            <circle cx="30" cy="40" r="5" fill="#4CAF50" />
            <circle cx="50" cy="55" r="5" fill="#4CAF50" />
            <circle cx="70" cy="30" r="5" fill="#4CAF50" />
            <circle cx="85" cy="60" r="5" fill="#4CAF50" />
            <path d="M 15 75 Q 30 35 50 55 Q 70 25 90 55" fill="none" stroke="#2D2D2D" strokeWidth="2" />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>Bom ajuste ✓</Typography>
        </Box>

        {/* Overfitting */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{ width: 80, height: 80 }}
          >
            <circle cx="20" cy="70" r="5" fill="#f44336" />
            <circle cx="30" cy="40" r="5" fill="#f44336" />
            <circle cx="50" cy="55" r="5" fill="#f44336" />
            <circle cx="70" cy="30" r="5" fill="#f44336" />
            <circle cx="85" cy="60" r="5" fill="#f44336" />
            <path d="M 15 70 Q 18 70 20 70 Q 25 70 28 40 Q 32 40 38 50 Q 45 55 50 55 Q 55 55 62 40 Q 68 30 70 30 Q 75 30 80 50 Q 83 60 85 60 Q 88 60 90 55" fill="none" stroke="#2D2D2D" strokeWidth="2" />
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>Overfitting</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// 14. RAG Pipeline
export function RAGPipelineMedia() {
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
        {/* Query */}
        <rect x="10" y="90" width="80" height="40" rx="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="2" />
        <text x="50" y="115" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">❓ Query</text>

        {/* Vector DB */}
        <rect x="120" y="30" width="80" height="50" rx="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="2" />
        <text x="160" y="52" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">📚 Vector</text>
        <text x="160" y="67" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Database</text>

        {/* Retrieved Docs */}
        <rect x="120" y="140" width="80" height="50" rx="8" fill="#FF7F5C" stroke="#2D2D2D" strokeWidth="2" />
        <text x="160" y="162" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">📄 Docs</text>
        <text x="160" y="177" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Relevantes</text>

        {/* LLM */}
        <rect x="230" y="90" width="60" height="40" rx="8" fill="#2196F3" stroke="#2D2D2D" strokeWidth="2" />
        <text x="260" y="115" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">🤖 LLM</text>

        {/* Response */}
        <rect x="310" y="90" width="35" height="40" rx="8" fill="#9C27B0" stroke="#2D2D2D" strokeWidth="2" />
        <text x="327" y="115" textAnchor="middle" fontSize="18" fill="white">💬</text>

        {/* Arrows */}
        <path d="M 90 100 L 118 60" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowR)" />
        <path d="M 160 80 L 160 138" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowR)" />
        <path d="M 200 165 L 230 125" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowR)" />
        <path d="M 90 110 L 228 110" stroke="#2D2D2D" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowR)" />
        <path d="M 290 110 L 308 110" stroke="#2D2D2D" strokeWidth="2" markerEnd="url(#arrowR)" />

        <defs>
          <marker id="arrowR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#2D2D2D" />
          </marker>
        </defs>
      </Box>
    </Box>
  );
}

// 15. Embedding Space
export function EmbeddingSpaceMedia() {
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
        <line x1="40" y1="200" x2="280" y2="200" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="40" y1="200" x2="40" y2="20" stroke="#2D2D2D" strokeWidth="2" />

        {/* Cluster 1 - Animals */}
        <circle cx="80" cy="60" r="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="95" cy="75" r="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="70" cy="85" r="8" fill="#E85D3A" stroke="#2D2D2D" strokeWidth="1.5" />
        <text x="85" y="105" textAnchor="middle" fontSize="9" fill="#6B6B6B">🐱 Animais</text>

        {/* Cluster 2 - Vehicles */}
        <circle cx="200" cy="70" r="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="220" cy="55" r="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="230" cy="80" r="8" fill="#4CAF50" stroke="#2D2D2D" strokeWidth="1.5" />
        <text x="215" y="100" textAnchor="middle" fontSize="9" fill="#6B6B6B">🚗 Veículos</text>

        {/* Cluster 3 - Food */}
        <circle cx="140" cy="150" r="8" fill="#2196F3" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="160" cy="165" r="8" fill="#2196F3" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="130" cy="170" r="8" fill="#2196F3" stroke="#2D2D2D" strokeWidth="1.5" />
        <text x="145" y="190" textAnchor="middle" fontSize="9" fill="#6B6B6B">🍕 Comida</text>

        {/* Query point */}
        <circle cx="110" cy="65" r="6" fill="#9C27B0" stroke="#2D2D2D" strokeWidth="2" />
        <text x="130" cy="50" fontSize="9" fill="#9C27B0">Query</text>
        
        {/* Similarity lines */}
        <line x1="110" y1="65" x2="95" y2="75" stroke="#9C27B0" strokeWidth="1.5" strokeDasharray="3" />
      </Box>
    </Box>
  );
}

// 16. Regularization
export function RegularizationMedia() {
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
        {[
          { icon: "💧", name: "Dropout", desc: "Desliga neurônios aleatoriamente" },
          { icon: "📏", name: "L1/L2", desc: "Penaliza pesos grandes" },
          { icon: "✋", name: "Early Stop", desc: "Para antes do overfit" },
          { icon: "📊", name: "Data Aug", desc: "Aumenta dados de treino" },
        ].map((tech, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              bgcolor: i === 0 ? "secondary.light" : "background.paper",
              borderRadius: 2,
              border: "1.5px solid #2D2D2D",
            }}
          >
            <Box sx={{ fontSize: "1.2rem" }}>{tech.icon}</Box>
            <Box>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{tech.name}</Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>{tech.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
