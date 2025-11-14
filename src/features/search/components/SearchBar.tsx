import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export function SearchBar({ onSearch, placeholder = 'חפש מוצר...', defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3 mb-4">
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#999"
        className="flex-1 mx-3 text-base text-text"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => setQuery('')} className="mr-2">
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handleSearch}
        className="bg-primary px-4 py-2 rounded-xl"
      >
        <Text className="text-white font-semibold">חפש</Text>
      </TouchableOpacity>
    </View>
  );
}
