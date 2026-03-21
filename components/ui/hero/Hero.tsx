import { MaterialIcons } from "@expo/vector-icons"; // Built into Expo
import { styled, Text, useTheme, YStack } from "tamagui";

const IconCircle = styled(YStack, {
  w: "$10",
  h: "$10",
  bg: "$primarySoft",
  br: "$round",
  ai: "center",
  jc: "center",
  mb: "$6",
  pos: "relative",
});

const Badge = styled(YStack, {
  pos: "absolute",
  bottom: -4,
  right: -4,
  bg: "$surface",
  p: "$1",
  br: "$round",
  borderWidth: 1,
  borderColor: "$border",
  ai: "center",
  jc: "center",
});

export function Hero() {
  // Extract the active theme tokens to pass raw hex values to external SVGs
  const theme = useTheme();

  return (
    <YStack ai="center" jc="center" py="$7">
      <IconCircle>
        {/* Main SVG Icon */}
        <MaterialIcons
          name="restaurant-menu"
          size={40} // Approximate to your 6xl tailwind class
          color={theme.primary.val} // .val extracts the raw hex string
        />

        <Badge>
          {/* Badge SVG Icon */}
          <MaterialIcons
            name="check-circle"
            size={16}
            color="#22c55e" // Tailwind green-500 from your original HTML
          />
        </Badge>
      </IconCircle>

      <Text
        fontFamily="$heading"
        fontSize="$7"
        fontWeight="700"
        color="$textMain"
        mb="$2"
        ta="center"
        letterSpacing="$6"
      >
        Scan Your Menu
      </Text>

      <Text
        fontFamily="$body"
        fontSize="$3"
        color="$textSub"
        ta="center"
        maxWidth={280}
        lineHeight="$4"
      >
        Analyze ingredients, detect allergens, and check dietary compatibility
        instantly.
      </Text>
    </YStack>
  );
}
