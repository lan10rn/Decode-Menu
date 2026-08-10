import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics"; // <-- Imported Haptics
import { Switch as NativeSwitch } from "react-native";
import { styled, Text, useTheme, XStack, YStack } from "tamagui";

// Base Diet Radio Card
export function DietCard({
  title,
  description,
  iconName,
  isActive,
  onPress,
}: any) {
  const theme = useTheme();
  const handlePress = () => {
    if (!isActive) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };
  return (
    <XStack
      p="$3"
      mb="$2"
      br="$3"
      borderWidth={2}
      borderColor={isActive ? "$primary" : "$border"}
      bg={isActive ? "$primarySoft" : "$surface"}
      ai="center"
      gap="$3"
      pressStyle={{ opacity: 0.8 }}
      onPress={handlePress}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isActive ? theme.primary.val : theme.textSub.val}
      />
      <YStack f={1}>
        <Text
          fontFamily="$body"
          fontSize="$3"
          fontWeight="700"
          color={isActive ? "$primary" : "$textMain"}
        >
          {title}
        </Text>
        <Text
          fontFamily="$body"
          fontSize={13}
          lineHeight={18}
          color={isActive ? "$primary" : "$textSub"}
          mt={2}
        >
          {description}
        </Text>
      </YStack>
      {isActive && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={theme.primary.val}
        />
      )}
    </XStack>
  );
}

// The Toggle Row
export function ToggleRow({ title, iconName, isActive, onToggle }: any) {
  const theme = useTheme();
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };
  return (
    <XStack
      p="$4"
      ai="center"
      jc="space-between"
      bg="$surface"
      pressStyle={{ opacity: 0.8 }}
      onPress={handleToggle}
    >
      <XStack ai="center" gap="$3">
        <MaterialCommunityIcons
          name={iconName}
          size={22}
          color={theme.danger.val}
        />
        <Text
          fontFamily="$body"
          fontSize="$3"
          fontWeight="600"
          color="$textMain"
        >
          {title}
        </Text>
      </XStack>
      <NativeSwitch
        value={isActive}
        onValueChange={handleToggle}
        trackColor={{ false: theme.border.val, true: theme.danger.val }}
        thumbColor="#ffffff"
      />
    </XStack>
  );
}

// The Allergen Chip
const ChipBox = styled(XStack, {
  px: "$3",
  py: "$2",
  br: "$round",
  borderWidth: 1,
  ai: "center",
  gap: "$2",
  variants: {
    active: {
      true: { bg: "$dangerSoft", borderColor: "$dangerBorder" },
      false: { bg: "$surface", borderColor: "$border" },
    },
  } as const,
});

export function AllergenChip({ label, isActive, onToggle }: any) {
  const theme = useTheme();
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };
  return (
    <ChipBox active={isActive} onPress={handleToggle}>
      <MaterialCommunityIcons
        name={isActive ? "close" : "plus"}
        size={16}
        color={isActive ? theme.danger.val : theme.textSub.val}
      />
      <Text
        fontFamily="$body"
        fontSize="$2"
        fontWeight="600"
        color={isActive ? "$dangerText" : "$textSub"}
        textTransform="capitalize"
      >
        {label}
      </Text>
    </ChipBox>
  );
}
