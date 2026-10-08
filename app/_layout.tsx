import { useEffect, useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssessmentProvider } from '../src/assessment/AssessmentContext';

export default function RootLayout() {
  const { width: nativeWidth } = useWindowDimensions();
  const [webWidth, setWebWidth] = useState<number | null>(null);
  // Static export hydrates with the server window size (0). Reading innerWidth
  // after mount is what keeps the phone column on a wide browser.
  const width = webWidth ?? nativeWidth;
  const wide = Platform.OS === 'web' && width > 520;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }
    const html = document.documentElement;
    html.style.height = '100%';
    html.style.backgroundColor = '#09090b';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.backgroundColor = '#09090b';

    const read = () => setWebWidth(window.innerWidth);
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View
        {...({ dataSet: { atlasRoot: '1' } } as object)}
        style={[styles.root, wide ? styles.rootWide : null]}
      >
        <View
          {...({ dataSet: { atlasColumn: '1' } } as object)}
          style={[styles.column, wide ? styles.columnWide : null]}
        >
          <AssessmentProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#000000' },
                animation: 'slide_from_right',
              }}
            />
          </AssessmentProvider>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  rootWide: {
    backgroundColor: '#09090b',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  columnWide: {
    width: 420,
    maxWidth: 420,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#222226',
  },
});
