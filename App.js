import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FORM_CONFIG, STORAGE_KEY } from './config';
import { styles } from './styles';

import SectionConstruction from './components/SectionConstruction';
import SectionUtility from './components/SectionUtility';
import SectionPhotos from './components/SectionPhotos';

export default function App() {
  const [data, setData] = useState({
    contractorMobilised: '',
    foundationStart: '',
    foundationEnd: '',
    earthingWorks: 'No',
    earthingType: '',
    earthingCount: 1,
    essWorks: 'No',
    essCount: 1,
    essUnits: {},
    panelCapacity: 575,
    panelCount: '',
    photos: {}
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch (e) {
      console.log('Error loading data', e);
    }
  };

  const updateField = (field, value) => {
    const updated = { ...data, [field]: value };
    setData(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateEssUnit = (index, subfield, value) => {
    const currentUnits = data.essUnits || {};
    const updatedUnits = {
      ...currentUnits,
      [index]: { ...(currentUnits[index] || {}), [subfield]: value }
    };
    updateField('essUnits', updatedUnits);
  };

  const togglePhoto = (photoName) => {
    const currentPhotos = { ...(data.photos || {}) };
    currentPhotos[photoName] = !currentPhotos[photoName];
    updateField('photos', currentPhotos);
  };

  const pvCapacity = (() => {
    const cap = parseFloat(data.panelCapacity) || 0;
    const count = parseFloat(data.panelCount) || 0;
    return ((cap * count) / 1000).toFixed(2);
  })();

  const getValidationErrors = () => {
    const errs = [];
    const today = new Date().toISOString().split('T')[0];

    if (data.contractorMobilised && data.contractorMobilised > today) errs.push('Contractor Mobilised date cannot be in the future.');
    if (data.foundationStart && data.foundationStart > today) errs.push('Solar Foundation start date cannot be in the future.');
    if (data.foundationEnd && data.foundationEnd > today) errs.push('Solar Foundation end date cannot be in the future.');
    
    if (data.foundationStart && data.contractorMobilised && data.foundationStart < data.contractorMobilised) {
      errs.push('Foundation start cannot be earlier than Mobilised date.');
    }
    if (data.foundationEnd && data.foundationStart && data.foundationEnd < data.foundationStart) {
      errs.push('Foundation end cannot be earlier than start date.');
    }

    FORM_CONFIG.foundationPhotos.forEach((p) => {
      const key = `Foundation - ${p}`;
      if (!data.photos[key]) errs.push(`Missing photo: ${key}`);
    });

    FORM_CONFIG.structurePhotos.forEach((p) => {
      const key = `Structure - ${p}`;
      if (!data.photos[key]) errs.push(`Missing photo: ${key}`);
    });

    if (data.earthingWorks === 'Yes') {
      const totalEarthing = parseInt(data.earthingCount) || 1;
      for (let i = 1; i <= totalEarthing; i++) {
        const key = `Earthing - EP${i}`;
        if (!data.photos[key]) errs.push(`Missing photo: ${key}`);
      }
    }

    return errs;
  };

  const handleSave = () => {
    const currentErrors = getValidationErrors();
    setErrors(currentErrors);
    if (currentErrors.length > 0) {
      Alert.alert('Validation Error', 'Fix outstanding rules and missing photos before completing.');
    } else {
      Alert.alert('Success', 'Form marked complete and saved successfully!');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.mainTitle}>Site Commissioning Form</Text>

        {errors.length > 0 && (
          <View style={styles.errorBox}>
            <Text style={styles.errorHeader}>Issues to fix before completing:</Text>
            {errors.map((err, i) => (
              <Text key={i} style={styles.errorItem}>• {err}</Text>
            ))}
          </View>
        )}

        <SectionConstruction data={data} updateField={updateField} />
        
        <SectionUtility 
          data={data} 
          updateField={updateField} 
          updateEssUnit={updateEssUnit} 
          pvCapacity={pvCapacity} 
        />
        
        <SectionPhotos data={data} togglePhoto={togglePhoto} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Mark Form Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
    
  );
}