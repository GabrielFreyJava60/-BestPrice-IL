import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center py-10 px-4">
      <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
      <Text className="text-xl font-semibold text-text mt-4 mb-2 text-center">
        שגיאה
      </Text>
      <Text className="text-textSecondary text-center mb-6">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">נסה שוב</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

