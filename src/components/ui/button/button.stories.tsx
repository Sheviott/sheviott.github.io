import type { Meta, StoryObj } from "@storybook/react";
import { FaPlus, FaArrowRight } from "react-icons/fa";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    color: { control: "color" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger", "dot", "tab"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "medium",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "medium",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "medium",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
    size: "medium",
  },
};

export const WithStartIcon: Story = {
  args: {
    children: "Add item",
    variant: "primary",
    startIcon: <FaPlus />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: "Continue",
    variant: "secondary",
    endIcon: <FaArrowRight />,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full width button",
    variant: "primary",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "primary",
    disabled: true,
  },
};
export const Dot: Story = {
  args: {
    children: "",
    variant: "dot",
    size: "small",
    color: "#7c3aed",
  },
};

export const Tab: Story = {
  args: {
    children: "Tab button",
    variant: "tab",
    size: "small",
    color: '#ff2211'
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom color",
    color: "#7c3aed",
  },
};