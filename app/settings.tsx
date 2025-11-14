import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Language, Theme } from '@/shared/types/settings';
import { Chain, CHAIN_CONFIGS } from '@/shared/types/product';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [language, setLanguage] = useState<Language>('he');
  const [theme, setTheme] = useState<Theme>('auto');
  const [preferredChain, setPreferredChain] = useState<Chain | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [isPro, setIsPro] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'he', name: 'עברית' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ];

  const themes: { code: Theme; name: string }[] = [
    { code: 'light', name: 'בהיר' },
    { code: 'dark', name: 'כהה' },
    { code: 'auto', name: 'אוטומטי' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-2xl font-bold text-text mb-6">הגדרות</Text>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4">שפה</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setLanguage(lang.code)}
                className={`flex-row items-center justify-between py-3 border-b border-gray-100 ${
                  language === lang.code ? 'bg-blue-50' : ''
                }`}
              >
                <Text className="text-base text-text">{lang.name}</Text>
                {language === lang.code && (
                  <Ionicons name="checkmark" size={20} color="#0066CC" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4">ערכת נושא</Text>
            {themes.map((th) => (
              <TouchableOpacity
                key={th.code}
                onPress={() => setTheme(th.code)}
                className={`flex-row items-center justify-between py-3 border-b border-gray-100 ${
                  theme === th.code ? 'bg-blue-50' : ''
                }`}
              >
                <Text className="text-base text-text">{th.name}</Text>
                {theme === th.code && (
                  <Ionicons name="checkmark" size={20} color="#0066CC" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4">רשת מועדפת</Text>
            {Object.entries(CHAIN_CONFIGS).map(([chain, config]) => (
              <TouchableOpacity
                key={chain}
                onPress={() =>
                  setPreferredChain(preferredChain === chain ? null : (chain as Chain))
                }
                className={`flex-row items-center justify-between py-3 border-b border-gray-100 ${
                  preferredChain === chain ? 'bg-blue-50' : ''
                }`}
              >
                <Text className="text-base text-text">{config.name}</Text>
                {preferredChain === chain && (
                  <Ionicons name="checkmark" size={20} color="#0066CC" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <Text className="text-base text-text">התראות</Text>
              <Switch value={notifications} onValueChange={setNotifications} />
            </View>
          </View>

          {!isPro && (
            <TouchableOpacity
              onPress={() => setIsPro(true)}
              className="bg-gradient-to-r from-primary to-secondary py-4 rounded-xl mb-4"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="star" size={24} color="#fff" />
                <Text className="text-white text-center text-lg font-semibold ml-2">
                  שדרג ל-Pro
                </Text>
              </View>
              <Text className="text-white text-center text-sm mt-1">
                הסר פרסומות • רשימות בלתי מוגבלות • היסטוריית מחירים
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

