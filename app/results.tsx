import { DishCard } from "@/components/ui/dish-card/DishCard";
import { FilterChip } from "@/components/ui/filter-chip/FilterChip";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, View, XStack, YStack, useTheme } from "tamagui";

import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ResultsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <YStack f={1} bg="$background">
      {/* Header */}
      <YStack
        bg="$surface"
        pt={insets.top + 16}
        pb="$2"
        borderBottomWidth={1}
        borderColor="$border"
      >
        <XStack px="$4" mb="$4" ai="center" jc="space-between">
          <View
            onPress={() => router.back()}
            pressStyle={{ opacity: 0.5 }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // Makes it easier to tap
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.textMain.val}
            />
          </View>
          <Text
            fontFamily="$heading"
            fontSize="$4"
            fontWeight="700"
            color="$textMain"
          >
            Detected Dishes
          </Text>
          <MaterialIcons name="search" size={24} color={theme.textMain.val} />
        </XStack>

        {/* Scrollable Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          <FilterChip label="All" active />
          <FilterChip label="Vegetarian" iconName="eco" />
          <FilterChip label="Halal" iconName="check-circle" />
          <FilterChip label="Gluten Free" iconName="grain" />
        </ScrollView>
      </YStack>

      {/* Main List */}
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <XStack jc="space-between" ai="center">
          <Text
            fontFamily="$body"
            fontSize={12}
            fontWeight="600"
            color="$textSub"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Results from Menu
          </Text>
          <XStack bg="$primarySoft" px="$2" py="$1" br="$round">
            <Text
              fontFamily="$body"
              fontSize={10}
              fontWeight="600"
              color="$primary"
            >
              High Accuracy
            </Text>
          </XStack>
        </XStack>

        <DishCard
          title="Tonkotsu Ramen"
          description="Rich pork bone broth with chashu, soft-boiled egg, and wood ear mushrooms."
          imageUrl="https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80"
          accuracy={98}
          tags={[
            { label: "Contains Pork", iconName: "warning", variant: "danger" },
            { label: "850 kcal", variant: "neutral" },
          ]}
        />

        <DishCard
          title="Green Garden Salad"
          description="Fresh seasonal greens, avocado, cucumber, and yuzu dressing."
          imageUrl="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"
          tags={[
            { label: "Vegetarian", iconName: "check", variant: "success" },
            { label: "Halal Safe", iconName: "check", variant: "success" },
          ]}
        />

        {/* Add the other cards similarly... */}
      </ScrollView>
    </YStack>
  );
}
