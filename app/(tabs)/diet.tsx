import {
  AllergenChip,
  DietCard,
  ToggleRow,
} from "@/components/ui/diet-settings/DietSettings";
import { useDietStore } from "@/store/useDietStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, ScrollView, Text, XStack, YStack } from "tamagui";

const BIG_9 = [
  "peanuts",
  "tree nuts",
  "dairy",
  "eggs",
  "wheat",
  "soy",
  "fish",
  "shellfish",
  "sesame",
];

export default function DietScreen() {
  const insets = useSafeAreaInsets();
  const store = useDietStore();
  const [customText, setCustomText] = useState("");

  const handleAddCustom = () => {
    if (customText.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      store.addRestriction(customText);
      setCustomText("");
    }
  };

  return (
    <YStack f={1} bg="$background">
      <YStack pt={insets.top + 24} px="$6" pb="$4" bg="$background">
        <Text
          fontFamily="$heading"
          fontSize={28}
          fontWeight="800"
          color="$textMain"
        >
          Dietary Profile
        </Text>
        <Text fontFamily="$body" fontSize="$3" color="$textSub" mt="$2">
          Your scanner uses these rules to flag ingredients.
        </Text>
      </YStack>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 140,
          paddingTop: 8,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          fontFamily="$body"
          fontSize={12}
          fontWeight="700"
          color="$textSub"
          textTransform="uppercase"
          letterSpacing={1}
          mb="$3"
          ml="$2"
        >
          Primary Diet
        </Text>
        <DietCard
          title="Standard (Omnivore)"
          description="No overarching restrictions."
          iconName="silverware-fork-knife"
          isActive={store.baseDiet === "standard"}
          onPress={() => store.setBaseDiet("standard")}
        />
        <DietCard
          title="Pescatarian"
          description="Eats seafood, but no meat or poultry."
          iconName="fish"
          isActive={store.baseDiet === "pescatarian"}
          onPress={() => store.setBaseDiet("pescatarian")}
        />
        <DietCard
          title="Vegetarian"
          description="No meat, poultry, or seafood."
          iconName="leaf"
          isActive={store.baseDiet === "vegetarian"}
          onPress={() => store.setBaseDiet("vegetarian")}
        />
        <DietCard
          title="Vegan"
          description="Strictly no animal products (dairy, eggs, honey)."
          iconName="sprout"
          isActive={store.baseDiet === "vegan"}
          onPress={() => store.setBaseDiet("vegan")}
        />
        <DietCard
          title="Jain"
          description="Vegetarian + no root vegetables (onions, garlic)."
          iconName="temple-hindu"
          isActive={store.baseDiet === "jain"}
          onPress={() => store.setBaseDiet("jain")}
        />

        {store.baseDiet === "standard" && (
          <YStack mt="$4">
            <Text
              fontFamily="$body"
              fontSize={12}
              fontWeight="700"
              color="$textSub"
              textTransform="uppercase"
              letterSpacing={1}
              mb="$3"
              ml="$2"
            >
              Specific Meat Exclusions
            </Text>
            <YStack
              bg="$surface"
              br="$4"
              overflow="hidden"
              borderWidth={1}
              borderColor="$border"
            >
              <ToggleRow
                title="Avoid Pork"
                iconName="pig"
                isActive={store.meatExclusions.includes("pork")}
                onToggle={() => store.toggleMeatExclusion("pork")}
              />
              <YStack h={1} bg="$border" />
              <ToggleRow
                title="Avoid Beef"
                iconName="cow"
                isActive={store.meatExclusions.includes("beef")}
                onToggle={() => store.toggleMeatExclusion("beef")}
              />
              <YStack h={1} bg="$border" />
              <ToggleRow
                title="Avoid Poultry"
                iconName="food-drumstick"
                isActive={store.meatExclusions.includes("poultry")}
                onToggle={() => store.toggleMeatExclusion("poultry")}
              />
            </YStack>
          </YStack>
        )}

        <YStack mt="$6">
          <Text
            fontFamily="$body"
            fontSize={12}
            fontWeight="700"
            color="$textSub"
            textTransform="uppercase"
            letterSpacing={1}
            mb="$3"
            ml="$2"
          >
            Ingredients to Avoid
          </Text>

          {store.restrictions.length > 0 && (
            <XStack flexWrap="wrap" gap="$2" mb="$3">
              {store.restrictions.map((item) => (
                <AllergenChip
                  key={`active-${item}`}
                  label={item}
                  isActive={true}
                  onToggle={() => store.removeRestriction(item)}
                />
              ))}
            </XStack>
          )}

          <XStack gap="$3" mb="$5" ai="center">
            <Input
              f={1}
              h={50}
              fontSize={16}
              placeholder="e.g., Cilantro, Strawberries..."
              value={customText}
              onChangeText={setCustomText}
              onSubmitEditing={handleAddCustom}
              bg="$surface"
              borderWidth={1}
              borderColor="$border"
              br="$3"
              px="$4"
              color="$textMain"
              focusStyle={{ borderColor: "$primary", borderWidth: 2 }}
            />
            <YStack
              w={50}
              h={50}
              bg="$primary"
              br="$round"
              ai="center"
              jc="center"
              pressStyle={{ opacity: 0.8, scale: 0.95 }}
              onPress={handleAddCustom}
            >
              <MaterialCommunityIcons name="plus" size={26} color="#fff" />
            </YStack>
          </XStack>

          <XStack flexWrap="wrap" gap="$2">
            {BIG_9.filter((item) => !store.restrictions.includes(item)).map(
              (allergen) => (
                <AllergenChip
                  key={`suggest-${allergen}`}
                  label={allergen}
                  isActive={false}
                  onToggle={() => store.addRestriction(allergen)}
                />
              ),
            )}
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
