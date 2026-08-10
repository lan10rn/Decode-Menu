import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, ScrollView, Text, XStack, YStack, useTheme } from "tamagui";

// --- DUMMY DATA (To be replaced by Gemini LLM output later) ---
const mockAnalysis = {
  dishName: "Spicy Pork Ramen",
  emoji: "🍜",
  status: "danger", // 'danger' | 'warning' | 'safe'
  confidence: 98,
  alertTitle: "Pork Detected",
  alertMessage:
    "This dish contains ingredients that conflict with your Halal and Vegetarian preferences.",
  ingredients: [
    { name: "Pork Belly", emoji: "🐷", note: "Main Protein" },
    { name: "Ramen Noodles", emoji: "🍜", note: "Wheat Base" },
    { name: "Boiled Egg", emoji: "🥚", note: "Topping" },
    { name: "Chili Oil", emoji: "🌶️", note: "Spicy Base" },
  ],
  characteristics: ["Spicy", "High Sodium", "Meat Based", "Contains Gluten"],
  macros: [
    { label: "Calories", value: "~650" },
    { label: "Protein", value: "~28g" },
    { label: "Fat", value: "~22g" },
    { label: "Carbs", value: "~75g" },
  ],
};

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  // Dynamic Theme Mapping based on safety status
  const statusColors = {
    danger: {
      bg: "$danger",
      soft: "$dangerSoft",
      border: "$dangerBorder",
      text: "$dangerText",
      icon: theme.danger.val,
    },
    warning: {
      bg: "$warning",
      soft: "$warningSoft",
      border: "$warningBorder",
      text: "$warningText",
      icon: theme.warning.val,
    },
    safe: {
      bg: "$success",
      soft: "$successSoft",
      border: "$successBorder",
      text: "$successText",
      icon: theme.success.val,
    },
  };
  const activeColor =
    statusColors[mockAnalysis.status as keyof typeof statusColors];

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <YStack f={1} bg="$background">
      {/* 1. FLOATING HEADER CONTROLS */}
      <XStack
        pos="absolute"
        top={insets.top + 8}
        left={0}
        right={0}
        px="$5"
        jc="space-between"
        zIndex={100}
      >
        <Circle
          size={44}
          bg="rgba(0,0,0,0.3)"
          pressStyle={{ scale: 0.9, bg: "rgba(0,0,0,0.5)" }}
          onPress={handleBack}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Circle>
        <Circle
          size={44}
          bg="rgba(0,0,0,0.3)"
          pressStyle={{ scale: 0.9, bg: "rgba(0,0,0,0.5)" }}
        >
          <MaterialCommunityIcons name="share-variant" size={22} color="#fff" />
        </Circle>
      </XStack>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* 2. IMMERSIVE EMOJI HERO */}
        {/* Uses the primary color of the status (e.g., Red for Danger) */}
        <YStack
          w="100%"
          h={320}
          bg={activeColor.bg}
          ai="center"
          jc="center"
          pt={insets.top}
        >
          <Text
            fontSize={100}
            style={{
              textShadowColor: "rgba(0,0,0,0.2)",
              textShadowRadius: 10,
              textShadowOffset: { width: 0, height: 4 },
            }}
          >
            {mockAnalysis.emoji}
          </Text>
        </YStack>

        {/* 3. OVERLAPPING CONTENT SHEET */}
        <YStack
          bg="$background"
          mt={-32}
          br="$6"
          pt="$5"
          px="$5"
          pb={insets.bottom + 40}
        >
          {/* Title & Badge */}
          <XStack jc="space-between" ai="flex-start" mb="$4">
            <YStack f={1} pr="$3">
              <Text
                fontFamily="$heading"
                fontSize={28}
                fontWeight="800"
                color="$textMain"
                lineHeight={34}
              >
                {mockAnalysis.dishName}
              </Text>
              <Text fontFamily="$body" fontSize="$3" color="$textSub" mt="$1">
                Detected from menu scan
              </Text>
            </YStack>
            <YStack
              bg={activeColor.soft}
              px="$3"
              py="$1.5"
              br="$round"
              borderWidth={1}
              borderColor={activeColor.border}
            >
              <Text
                fontFamily="$body"
                fontSize={12}
                fontWeight="800"
                color={activeColor.text}
                textTransform="uppercase"
              >
                {mockAnalysis.status === "danger"
                  ? "High Risk"
                  : mockAnalysis.status === "warning"
                    ? "Caution"
                    : "Safe"}
              </Text>
            </YStack>
          </XStack>

          {/* 4. DYNAMIC SAFETY ALERT CARD */}
          <XStack
            bg={activeColor.soft}
            br="$4"
            p="$4"
            borderWidth={1}
            borderColor={activeColor.border}
            ai="flex-start"
            gap="$3"
            mb="$6"
          >
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color={activeColor.icon}
            />
            <YStack f={1}>
              <Text
                fontFamily="$body"
                fontSize="$4"
                fontWeight="700"
                color={activeColor.text}
              >
                {mockAnalysis.alertTitle}
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$3"
                color={activeColor.text}
                mt="$1"
                opacity={0.9}
                lineHeight={20}
              >
                {mockAnalysis.alertMessage}
              </Text>
            </YStack>
          </XStack>

          {/* 5. AI CONFIDENCE HEADER */}
          <XStack jc="space-between" ai="flex-end" mb="$4">
            <Text
              fontFamily="$heading"
              fontSize="$5"
              fontWeight="700"
              color="$textMain"
            >
              AI Analysis
            </Text>
            <XStack ai="center" gap="$1">
              <MaterialCommunityIcons
                name="shield-check"
                size={16}
                color={theme.primary.val}
              />
              <Text
                fontFamily="$body"
                fontSize="$2"
                fontWeight="700"
                color="$primary"
              >
                {mockAnalysis.confidence}% Match
              </Text>
            </XStack>
          </XStack>

          {/* 6. EMOJI INGREDIENT GRID (2 Columns) */}
          <XStack flexWrap="wrap" jc="space-between" mb="$6">
            {mockAnalysis.ingredients.map((item, idx) => (
              <XStack
                key={idx}
                w="48%"
                bg="$surface"
                p="$2"
                br="$3"
                borderWidth={1}
                borderColor="$border"
                ai="center"
                gap="$3"
                mb="$3"
              >
                <YStack
                  w={36}
                  h={36}
                  br="$round"
                  bg="$background"
                  ai="center"
                  jc="center"
                >
                  <Text fontSize={18}>{item.emoji}</Text>
                </YStack>
                <YStack f={1}>
                  <Text
                    fontFamily="$body"
                    fontSize={13}
                    fontWeight="700"
                    color="$textMain"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    fontFamily="$body"
                    fontSize={10}
                    color="$textSub"
                    numberOfLines={1}
                  >
                    {item.note}
                  </Text>
                </YStack>
              </XStack>
            ))}
          </XStack>

          {/* 7. DIETARY CHARACTERISTICS CHIPS */}
          <Text
            fontFamily="$heading"
            fontSize="$4"
            fontWeight="700"
            color="$textMain"
            mb="$3"
          >
            Characteristics
          </Text>
          <XStack flexWrap="wrap" gap="$2" mb="$6">
            {mockAnalysis.characteristics.map((tag, idx) => (
              <YStack
                key={idx}
                bg="$surface"
                px="$3"
                py="$1.5"
                br="$round"
                borderWidth={1}
                borderColor="$border"
              >
                <Text
                  fontFamily="$body"
                  fontSize={12}
                  fontWeight="600"
                  color="$textSub"
                >
                  {tag}
                </Text>
              </YStack>
            ))}
          </XStack>

          {/* 8. ESTIMATED MACROS (Soft UI) */}
          <Text
            fontFamily="$heading"
            fontSize="$4"
            fontWeight="700"
            color="$textMain"
            mb="$3"
          >
            Estimated Average
          </Text>
          <XStack jc="space-between" gap="$2" mb="$6">
            {mockAnalysis.macros.map((macro, idx) => (
              <YStack
                key={idx}
                f={1}
                bg="$surface"
                py="$3"
                br="$4"
                ai="center"
                borderWidth={1}
                borderColor="$border"
              >
                <Text
                  fontFamily="$body"
                  fontSize={10}
                  fontWeight="700"
                  color="$textSub"
                  textTransform="uppercase"
                  letterSpacing={0.5}
                >
                  {macro.label}
                </Text>
                <Text
                  fontFamily="$body"
                  fontSize={15}
                  fontWeight="800"
                  color="$textMain"
                  mt="$1"
                >
                  {macro.value}
                </Text>
              </YStack>
            ))}
          </XStack>

          {/* 9. STICKY FOOTER DISCLAIMER */}
          <XStack
            bg="$surface"
            p="$3"
            br="$3"
            borderWidth={1}
            borderColor="$warningBorder"
            ai="center"
            gap="$3"
            mt="$2"
          >
            <MaterialCommunityIcons
              name="information"
              size={20}
              color={theme.warning.val}
            />
            <Text
              fontFamily="$body"
              fontSize={11}
              color="$textSub"
              f={1}
              lineHeight={16}
            >
              <Text fontWeight="700" color="$textMain">
                AI Detection:{" "}
              </Text>
              Results are estimated. Always ask restaurant staff to confirm
              allergens before ordering.
            </Text>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
