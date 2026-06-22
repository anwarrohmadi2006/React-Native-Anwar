import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FlexboxDemo from './components/FlexboxDemo';
import HalamanProfil from './components/HalamanProfil';
import FormLogin from './components/FormLogin';

export default function App() {
  const [activeTab, setActiveTab] = useState('A');

  const renderContent = () => {
    switch (activeTab) {
      case 'A': return <FlexboxDemo />;
      case 'B': return <HalamanProfil />;
      case 'C': return <FormLogin />;
      default: return <FlexboxDemo />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Pressable 
          style={[styles.navButton, activeTab === 'A' && styles.navButtonActive]} 
          onPress={() => setActiveTab('A')}
        >
          <Text style={[styles.navText, activeTab === 'A' && styles.navTextActive]}>Prak A</Text>
        </Pressable>
        <Pressable 
          style={[styles.navButton, activeTab === 'B' && styles.navButtonActive]} 
          onPress={() => setActiveTab('B')}
        >
          <Text style={[styles.navText, activeTab === 'B' && styles.navTextActive]}>Prak B</Text>
        </Pressable>
        <Pressable 
          style={[styles.navButton, activeTab === 'C' && styles.navButtonActive]} 
          onPress={() => setActiveTab('C')}
        >
          <Text style={[styles.navText, activeTab === 'C' && styles.navTextActive]}>Prak C</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 40,
    backgroundColor: '#002C5E',
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'transparent',
  },
  navButtonActive: {
    borderColor: '#FFFFFF',
  },
  navText: {
    color: '#A0C4E3',
    fontWeight: 'bold',
  },
  navTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  }
});
