import { defineType, defineField, defineArrayMember } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";

/**
 * Visualization Configuration Schema
 *
 * Allows CMS-driven configuration of interactive visualizations.
 * The visual STRUCTURE stays in code, but CONTENT (titles, labels, colors)
 * is fully editable via Sanity Studio.
 *
 * Philosophy: "Data > Presentation" - We model WHAT things are, not how they look.
 */

// Available visualization types with their default state counts
const visualizationTypes = [
  { title: "Neural Network", value: "neural-network" },
  { title: "Gradient Descent", value: "gradient-descent" },
  { title: "Decision Tree", value: "decision-tree" },
  { title: "Confusion Matrix", value: "confusion-matrix" },
  { title: "Loss Chart", value: "loss-chart" },
  { title: "Data Flow / Pipeline", value: "data-flow" },
  { title: "Transformer Architecture", value: "transformer" },
  { title: "Attention Mechanism", value: "attention" },
  { title: "Convolution Operation", value: "convolution" },
  { title: "CNN Architecture", value: "cnn-architecture" },
  { title: "Pooling Layer", value: "pooling" },
  { title: "Transfer Learning", value: "transfer-learning" },
  { title: "Overfitting Curves", value: "overfitting" },
  { title: "RAG Pipeline", value: "rag-pipeline" },
  { title: "Embedding Space", value: "embedding-space" },
  { title: "Regularization", value: "regularization" },
];

export default defineType({
  name: "visualizationConfig",
  title: "Visualization Configuration",
  type: "document",
  icon: ChartUpwardIcon,
  fields: [
    // ===================
    // VISUALIZATION TYPE
    // ===================
    defineField({
      name: "type",
      title: "Visualization Type",
      type: "string",
      description: "Choose the type of interactive visualization",
      options: {
        list: visualizationTypes,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ===================
    // DISPLAY CONTENT
    // ===================
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title displayed above the visualization (e.g., '🧠 Rede Neural em Ação')",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional subtitle or brief description",
    }),

    // ===================
    // STATE LABELS
    // ===================
    defineField({
      name: "stateLabels",
      title: "State Labels",
      type: "array",
      description:
        "Labels for each state of the visualization. These describe what happens at each scroll position.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stateLabel",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Short label (e.g., 'Input Layer', 'Hidden Layer 1')",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "Optional longer description for this state",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "description",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "State",
                subtitle: subtitle,
              };
            },
          },
        }),
      ],
    }),

    // ===================
    // THEME / COLORS
    // ===================
    defineField({
      name: "theme",
      title: "Color Theme",
      type: "object",
      description: "Customize the visualization colors",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "preset",
          title: "Color Preset",
          type: "string",
          description: "Use a predefined color scheme or customize below",
          options: {
            list: [
              { title: "Default (MLU Brand)", value: "default" },
              { title: "Cool (Blues)", value: "cool" },
              { title: "Warm (Oranges)", value: "warm" },
              { title: "Nature (Greens)", value: "nature" },
              { title: "Vibrant", value: "vibrant" },
              { title: "Custom", value: "custom" },
            ],
            layout: "radio",
          },
          initialValue: "default",
        }),
        defineField({
          name: "colors",
          title: "Custom Colors",
          type: "array",
          description: "Define custom colors for each element/state (hex codes)",
          of: [defineArrayMember({ type: "string" })],
          hidden: ({ parent }) => parent?.preset !== "custom",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Background color of the visualization card (hex code)",
          hidden: ({ parent }) => parent?.preset !== "custom",
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: NEURAL NETWORK
    // ===================
    defineField({
      name: "neuralNetworkConfig",
      title: "Neural Network Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "neural-network",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "layerLabels",
          title: "Layer Labels",
          type: "array",
          description: "Labels for each layer (e.g., Input, Hidden 1, Hidden 2, Output)",
          of: [defineArrayMember({ type: "string" })],
          initialValue: ["Input", "Hidden 1", "Hidden 2", "Output"],
        }),
        defineField({
          name: "layerSizes",
          title: "Nodes per Layer",
          type: "array",
          description: "Number of nodes in each layer (e.g., 3, 4, 2, 1)",
          of: [defineArrayMember({ type: "number" })],
          initialValue: [3, 4, 2, 1],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: DATA FLOW / PIPELINE
    // ===================
    defineField({
      name: "pipelineConfig",
      title: "Pipeline Configuration",
      type: "object",
      hidden: ({ parent }) =>
        parent?.type !== "data-flow" && parent?.type !== "rag-pipeline",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "steps",
          title: "Pipeline Steps",
          type: "array",
          description: "Define each step in the pipeline",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon (Emoji)",
                  type: "string",
                  description: "Single emoji to represent this step",
                  validation: (Rule) => Rule.max(2),
                }),
              ],
              preview: {
                select: { title: "label", icon: "icon" },
                prepare({ title, icon }) {
                  return { title: `${icon || "📦"} ${title}` };
                },
              },
            }),
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: TRANSFORMER
    // ===================
    defineField({
      name: "transformerConfig",
      title: "Transformer Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "transformer",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "blocks",
          title: "Architecture Blocks",
          type: "array",
          description: "Define the blocks in the transformer architecture",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Block Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          initialValue: [
            { label: "Input" },
            { label: "Encoder" },
            { label: "Attention" },
            { label: "Decoder" },
            { label: "Output" },
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: ATTENTION
    // ===================
    defineField({
      name: "attentionConfig",
      title: "Attention Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "attention",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "queryLabels",
          title: "Query Labels",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          initialValue: ["Q₁", "Q₂", "Q₃"],
        }),
        defineField({
          name: "keyLabels",
          title: "Key Labels",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          initialValue: ["K₁", "K₂", "K₃"],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: CONFUSION MATRIX
    // ===================
    defineField({
      name: "confusionMatrixConfig",
      title: "Confusion Matrix Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "confusion-matrix",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "values",
          title: "Matrix Values",
          type: "object",
          description: "The 4 values of the confusion matrix",
          fields: [
            defineField({ name: "truePositive", title: "True Positive (TP)", type: "number", initialValue: 42 }),
            defineField({ name: "falsePositive", title: "False Positive (FP)", type: "number", initialValue: 8 }),
            defineField({ name: "falseNegative", title: "False Negative (FN)", type: "number", initialValue: 5 }),
            defineField({ name: "trueNegative", title: "True Negative (TN)", type: "number", initialValue: 45 }),
          ],
        }),
        defineField({
          name: "labels",
          title: "Labels",
          type: "object",
          fields: [
            defineField({ name: "positiveClass", title: "Positive Class Label", type: "string", initialValue: "Real +" }),
            defineField({ name: "negativeClass", title: "Negative Class Label", type: "string", initialValue: "Real -" }),
            defineField({ name: "predictedPositive", title: "Predicted Positive", type: "string", initialValue: "Pred +" }),
            defineField({ name: "predictedNegative", title: "Predicted Negative", type: "string", initialValue: "Pred -" }),
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: LOSS CHART
    // ===================
    defineField({
      name: "lossChartConfig",
      title: "Loss Chart Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "loss-chart",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "dataPoints",
          title: "Data Points",
          type: "array",
          description: "Loss values at each epoch",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "epoch", title: "Epoch", type: "number" }),
                defineField({ name: "loss", title: "Loss Value", type: "number" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "xAxisLabel",
          title: "X-Axis Label",
          type: "string",
          initialValue: "Epochs",
        }),
        defineField({
          name: "yAxisLabel",
          title: "Y-Axis Label",
          type: "string",
          initialValue: "Loss",
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: CNN ARCHITECTURE
    // ===================
    defineField({
      name: "cnnConfig",
      title: "CNN Architecture Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "cnn-architecture",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "layers",
          title: "CNN Layers",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Layer Label", type: "string" }),
                defineField({
                  name: "type",
                  title: "Layer Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Input", value: "input" },
                      { title: "Convolution", value: "conv" },
                      { title: "Pooling", value: "pool" },
                      { title: "Fully Connected", value: "fc" },
                      { title: "Output", value: "output" },
                    ],
                  },
                }),
                defineField({
                  name: "icon",
                  title: "Icon (Emoji)",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: DECISION TREE
    // ===================
    defineField({
      name: "decisionTreeConfig",
      title: "Decision Tree Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "decision-tree",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "rootLabel",
          title: "Root Node Label",
          type: "string",
          initialValue: "Root",
        }),
        defineField({
          name: "depth",
          title: "Tree Depth",
          type: "number",
          description: "Number of levels in the tree (2-4)",
          validation: (Rule) => Rule.min(2).max(4),
          initialValue: 3,
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: OVERFITTING
    // ===================
    defineField({
      name: "overfittingConfig",
      title: "Overfitting Chart Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "overfitting",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "trainLabel",
          title: "Training Curve Label",
          type: "string",
          initialValue: "Train",
        }),
        defineField({
          name: "validationLabel",
          title: "Validation Curve Label",
          type: "string",
          initialValue: "Val",
        }),
        defineField({
          name: "showOverfitZone",
          title: "Highlight Overfitting Zone",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: EMBEDDING SPACE
    // ===================
    defineField({
      name: "embeddingConfig",
      title: "Embedding Space Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "embedding-space",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "clusterLabels",
          title: "Cluster Labels",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          initialValue: ["Cluster A", "Cluster B", "Cluster C"],
        }),
        defineField({
          name: "axisLabels",
          title: "Axis Labels",
          type: "object",
          fields: [
            defineField({ name: "x", title: "X-Axis", type: "string", initialValue: "Dimension 1" }),
            defineField({ name: "y", title: "Y-Axis", type: "string", initialValue: "Dimension 2" }),
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: REGULARIZATION
    // ===================
    defineField({
      name: "regularizationConfig",
      title: "Regularization Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "regularization",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "techniques",
          title: "Regularization Techniques",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Technique Name", type: "string" }),
                defineField({ name: "icon", title: "Icon (Emoji)", type: "string" }),
                defineField({ name: "description", title: "Short Description", type: "string" }),
              ],
            }),
          ],
          initialValue: [
            { name: "Sem Reg.", icon: "〰️", description: "Overfitting" },
            { name: "L2 (Ridge)", icon: "📏", description: "Smooth" },
            { name: "Dropout", icon: "🎲", description: "Random Off" },
          ],
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: TRANSFER LEARNING
    // ===================
    defineField({
      name: "transferLearningConfig",
      title: "Transfer Learning Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "transfer-learning",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "baseModelLabel",
          title: "Base Model Label",
          type: "string",
          initialValue: "🧠 Pre-trained Base Model (ImageNet)",
        }),
        defineField({
          name: "frozenLabel",
          title: "Frozen Layers Label",
          type: "string",
          initialValue: "🔒 Frozen Layers",
        }),
        defineField({
          name: "newHeadLabel",
          title: "New Head Label",
          type: "string",
          initialValue: "🎯 New Task Head (Your Data)",
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: CONVOLUTION
    // ===================
    defineField({
      name: "convolutionConfig",
      title: "Convolution Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "convolution",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "inputSize",
          title: "Input Grid Size",
          type: "number",
          description: "Size of the input grid (e.g., 5 for 5x5)",
          initialValue: 5,
        }),
        defineField({
          name: "filterSize",
          title: "Filter Size",
          type: "number",
          description: "Size of the convolution filter (e.g., 3 for 3x3)",
          initialValue: 3,
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: POOLING
    // ===================
    defineField({
      name: "poolingConfig",
      title: "Pooling Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "pooling",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "poolingType",
          title: "Pooling Type",
          type: "string",
          options: {
            list: [
              { title: "Max Pooling", value: "max" },
              { title: "Average Pooling", value: "avg" },
            ],
            layout: "radio",
          },
          initialValue: "max",
        }),
        defineField({
          name: "inputSize",
          title: "Input Size",
          type: "number",
          initialValue: 4,
        }),
        defineField({
          name: "poolSize",
          title: "Pool Size",
          type: "number",
          initialValue: 2,
        }),
      ],
    }),

    // ===================
    // TYPE-SPECIFIC: GRADIENT DESCENT
    // ===================
    defineField({
      name: "gradientDescentConfig",
      title: "Gradient Descent Configuration",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "gradient-descent",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "startLabel",
          title: "Start Point Label",
          type: "string",
          initialValue: "Start",
        }),
        defineField({
          name: "endLabel",
          title: "End Point Label",
          type: "string",
          initialValue: "Minimum",
        }),
        defineField({
          name: "numSteps",
          title: "Number of Steps",
          type: "number",
          description: "How many steps to show in the descent",
          validation: (Rule) => Rule.min(2).max(10),
          initialValue: 5,
        }),
      ],
    }),
  ],

  // ===================
  // PREVIEW IN STUDIO
  // ===================
  preview: {
    select: {
      title: "title",
      type: "type",
      subtitle: "subtitle",
    },
    prepare({ title, type, subtitle }) {
      const typeLabels: Record<string, string> = {
        "neural-network": "🧠",
        "gradient-descent": "⛰️",
        "decision-tree": "🌳",
        "confusion-matrix": "📊",
        "loss-chart": "📉",
        "data-flow": "🔄",
        transformer: "🤖",
        attention: "🔍",
        convolution: "🔲",
        "cnn-architecture": "🏗️",
        pooling: "⬇️",
        "transfer-learning": "🔄",
        overfitting: "📈",
        "rag-pipeline": "🔗",
        "embedding-space": "🌌",
        regularization: "🛡️",
      };

      return {
        title: title || "Visualization",
        subtitle: `${typeLabels[type] || "📊"} ${type || "Not configured"}${subtitle ? ` - ${subtitle}` : ""}`,
      };
    },
  },
});
