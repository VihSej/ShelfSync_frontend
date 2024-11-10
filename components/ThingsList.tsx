import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import fetchThings from "../services/fetchThings";
import ThingsListCard from "./ThingsListCard";
import ThingView from "./ThingView";

interface Thing {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface ThingsListProps {
  spaceId: string;
}

const ThingsList: React.FC<ThingsListProps> = ({ spaceId }) => {
  const [things, setThings] = useState<Thing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedThing, setSelectedThing] = useState<Thing | null>(null);
  const [isThingViewVisible, setIsThingViewVisible] = useState(false);

  useEffect(() => {
    const loadThings = async () => {
      try {
        setIsLoading(true);
        const items = await fetchThings(spaceId);
        setThings(items);
        setError(null);
      } catch (err) {
        setError("Failed to load things. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadThings();
  }, [spaceId]);

  const handleThingPress = (thing: Thing) => {
    setSelectedThing(thing);
    setIsThingViewVisible(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things:</Text>
      <FlatList
        data={things}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleThingPress(item)}
            activeOpacity={0.7}
          >
            <ThingsListCard
              name={item.name}
              description={item.description}
              image={item.image}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
      <ThingView
        visible={isThingViewVisible}
        onClose={() => setIsThingViewVisible(false)}
        thing={selectedThing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures ThingsList fills the vertical space
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1, // Center ActivityIndicator vertically and horizontally
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1, // Center error message
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default ThingsList;
