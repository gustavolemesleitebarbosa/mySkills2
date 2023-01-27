import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from './SkillCard';

interface SkillData {
  id: string;
  name: string;
}

const Home = () => {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };
    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveNewSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => id !== skill.id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good night');
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text testID="welcome" style={styles.title}>
          Welcome, Gustavo
        </Text>
        <Text style={[styles.greetings]}>{greetings}</Text>
        <TextInput
          testID="input-new"
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />
        <Button testID="button-add" title="Add" onPress={handleAddNewSkill} />
        <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

        {mySkills && (
          <FlatList
            testID="flat-list-skills"
            data={mySkills}
            keyboardShouldPersistTaps="never"
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <SkillCard
                skill={item.name}
                onPress={() => handleRemoveNewSkill(item.id)}
              />
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#FFF',
  },
});

export {Home};
