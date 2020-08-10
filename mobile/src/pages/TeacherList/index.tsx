import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';


import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const [teachers, setTeaches] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  
  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })
        setFavorites(favoritedTeachersIds);
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites();
  });
  
  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        week_day,
        subject,
        time
      }
    });

    setTeaches(response.data);
    setIsFiltersVisible(false);
  }

  function handleToggleFiltersVisible() {
      setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )}  
      >
          {isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Máteria</Text>
              <TextInput 
                style={styles.input}
                placeholder="Qual a materia?"
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholderTextColor="#c1bccc"
              />
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Qual dia?"
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                    placeholderTextColor="#c1bccc"
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Hórario</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Qual hórario?"
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholderTextColor="#c1bccc"
                  />
                </View>
              </View>

              <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>

            </View>
            )
          }
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
      {teachers.map((teacher: Teacher) => {
         return (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher} 
            favorited={favorites.includes(teacher.id)}
          />
        )
      })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;