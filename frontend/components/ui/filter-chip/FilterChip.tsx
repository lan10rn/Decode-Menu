import { MaterialIcons } from "@expo/vector-icons";
import { styled, Text, useTheme, XStack } from "tamagui";

const ChipBox = styled(XStack, {
  h: 36,
  px: "$4",
  br: "$round",
  ai: "center",
  jc: "center",
  gap: "$2",
  borderWidth: 1,

  variants: {
    active: {
      true: { bg: "$primary", borderColor: "$primary" },
      false: { bg: "$surface", borderColor: "$border" },
    },
  } as const,
  defaultVariants: { active: false },
});

export function FilterChip({
  label,
  iconName,
  active = false,
}: {
  label: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  active?: boolean;
}) {
  const theme = useTheme();

  return (
    <ChipBox active={active}>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={16}
          color={active ? "#ffffff" : theme.textSub.val}
        />
      )}
      <Text
        fontFamily="$body"
        fontSize="$2"
        fontWeight="600"
        color={active ? "#ffffff" : "$textSub"}
      >
        {label}
      </Text>
    </ChipBox>
  );
}
