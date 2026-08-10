import { MaterialIcons } from "@expo/vector-icons";
import { styled, Text, useTheme, XStack, YStack } from "tamagui";

const Card = styled(XStack, {
  p: "$4",
  br: "$3",
  bg: "$surface",
  borderWidth: 2,
  borderColor: "transparent",
  ai: "center",

  pressStyle: { scale: 0.98, opacity: 0.9 },

  variants: {
    variant: {
      primary: { borderColor: "$primarySoft" },
      secondary: { borderColor: "$border" },
    },
  } as const,
  defaultVariants: { variant: "primary" },
});

const IconBox = styled(YStack, {
  w: "$8",
  h: "$8",
  br: "$round",
  mr: "$5",
  ai: "center",
  jc: "center",

  variants: {
    variant: {
      primary: { bg: "$primarySoft" },
      secondary: { bg: "$background" },
    },
  } as const,
  defaultVariants: { variant: "primary" },
});

export function ActionCard({
  title,
  subtitle,
  iconName,
  variant = "primary",
  onPress,
}: {
  title: string;
  subtitle: string;
  iconName: keyof typeof MaterialIcons.glyphMap; // Strictly types the Expo icon string
  variant?: "primary" | "secondary";
  onPress?: () => void;
}) {
  const theme = useTheme();
  const isPrimary = variant === "primary";

  return (
    <Card variant={variant} onPress={onPress}>
      <IconBox variant={variant}>
        <MaterialIcons
          name={iconName}
          size={24}
          color={isPrimary ? theme.primary.val : theme.textSub.val}
        />
      </IconBox>

      <YStack f={1}>
        <Text
          fontFamily="$body"
          fontSize="$5"
          fontWeight="600"
          color="$textMain"
          mb="$1"
        >
          {title}
        </Text>
        <Text fontFamily="$body" fontSize="$3" color="$textSub">
          {subtitle}
        </Text>
      </YStack>

      {/* The right chevron arrow */}
      <MaterialIcons
        name="arrow-forward-ios"
        size={16}
        color={isPrimary ? theme.primary.val : theme.border.val}
      />
    </Card>
  );
}
