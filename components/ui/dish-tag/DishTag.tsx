import { MaterialIcons } from "@expo/vector-icons";
import { styled, Text, useTheme, XStack } from "tamagui";

const TagBox = styled(XStack, {
  px: "$2",
  py: "$1",
  br: "$2",
  ai: "center",
  gap: "$1",
  borderWidth: 1,

  variants: {
    variant: {
      danger: { bg: "$dangerSoft", borderColor: "$dangerBorder" },
      success: { bg: "$successSoft", borderColor: "$successBorder" },
      info: { bg: "$infoSoft", borderColor: "$infoBorder" },
      neutral: { bg: "$neutralSoft", borderColor: "$neutralBorder" },
    },
  } as const,
});

export type TagVariant = "danger" | "success" | "info" | "neutral";

export function DishTag({
  label,
  iconName,
  variant,
}: {
  label: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  variant: TagVariant;
}) {
  const theme = useTheme();

  // Map variant to text color token
  const colorMap = {
    danger: theme.dangerText.val,
    success: theme.successText.val,
    info: theme.infoText.val,
    neutral: theme.neutralText.val,
  };

  return (
    <TagBox variant={variant}>
      {iconName && (
        <MaterialIcons name={iconName} size={12} color={colorMap[variant]} />
      )}
      <Text
        fontFamily="$body"
        fontSize={11}
        fontWeight="700"
        color={`$${variant}Text`}
      >
        {label}
      </Text>
    </TagBox>
  );
}
