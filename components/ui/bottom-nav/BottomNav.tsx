import { MaterialIcons } from "@expo/vector-icons";
import { styled, Text, useTheme, XStack, YStack } from "tamagui";

const NavContainer = styled(XStack, {
  pos: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  bg: "$surface",
  borderTopWidth: 1,
  borderColor: "$border",
  px: "$6",
  pt: "$3",
  pb: "$6", // Extra padding for indicator safe area
  jc: "space-around",
  ai: "center",
  zIndex: 100, // Ensure it floats above the ScrollView
});

export function BottomNav() {
  const theme = useTheme();

  return (
    <NavContainer>
      {/* Active Tab */}
      <YStack ai="center" gap="$1" pressStyle={{ opacity: 0.7 }}>
        <MaterialIcons
          name="photo-camera"
          size={24}
          color={theme.primary.val}
        />
        <Text
          fontFamily="$body"
          fontSize={10}
          fontWeight="600"
          color="$primary"
        >
          Scan
        </Text>
      </YStack>

      {/* Inactive Tabs */}
      <YStack ai="center" gap="$1" pressStyle={{ opacity: 0.7 }}>
        <MaterialIcons name="person" size={24} color={theme.textSub.val} />
        <Text
          fontFamily="$body"
          fontSize={10}
          fontWeight="500"
          color="$textSub"
        >
          Profile
        </Text>
      </YStack>

      <YStack ai="center" gap="$1" pressStyle={{ opacity: 0.7 }}>
        <MaterialIcons name="restaurant" size={24} color={theme.textSub.val} />
        <Text
          fontFamily="$body"
          fontSize={10}
          fontWeight="500"
          color="$textSub"
        >
          Diet
        </Text>
      </YStack>
    </NavContainer>
  );
}
