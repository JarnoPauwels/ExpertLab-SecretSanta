import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from 'react-native';

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState('');
  const [results, setResults] = useState([]);
  const [namesDrawn, setNamesDrawn] = useState(false);
  const [namesRedrawn, setNamesRedrawn] = useState(false);
  const [appState, setAppState] = useState('addParticipants');

  const addParticipant = (name) => {
    setParticipants([...participants, name]);
  };

  const addParticipantHandler = () => {
    if (participantName) {
      addParticipant(participantName);
      setParticipantName('');
    }
  };

  const drawNames = () => {
    const shuffledParticipants = [...participants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [
        shuffledParticipants[j],
        shuffledParticipants[i],
      ];
    }

    const resultPairs = shuffledParticipants.map((participant, index) => ({
      participant,
      assigned: shuffledParticipants[(index + 1) % shuffledParticipants.length],
    }));

    setResults(resultPairs);
    setNamesDrawn(true);
    setNamesRedrawn(false); // Reset the namesRedrawn state
    setAppState('showResults');
  };

  const drawNamesAgain = () => {
    setNamesDrawn(false);
    setResults([]);
    setNamesRedrawn(true); // Set namesRedrawn to true to allow drawing names again

    // If you want to start drawing names immediately after clicking "Draw Names Again"
    drawNames();
  };

  const presentImages = [
    require('./images/presentgreen.png'),
    require('./images/presentblue.png'),
    require('./images/presentred.png'),
  ];

  const getRandomPresentImage = () => {
    const randomIndex = Math.floor(Math.random() * presentImages.length);
    return presentImages[randomIndex];
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.participantItemText}>
        <Text style={{ fontWeight: 'bold' }}>{item.participant}</Text>
        {' Buys a '}
          <Image
            source={getRandomPresentImage()} 
            style={styles.presentImage}
            resizeMode="contain" 
          />
        {' For '}
        <Text style={{ fontWeight: 'bold' }}>{item.assigned}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./images/santahat.png')} 
          style={styles.headerImage}
          resizeMode="contain" 
        />
        <Text style={styles.title}>Secret Santa App</Text>
      </View>
      <View style={styles.body}>
        {appState === 'addParticipants' && (
          <>
            <Text style={styles.subtitle}>Participants:</Text>
            <FlatList
              data={participants}
              renderItem={({ item }) => (
                <View style={styles.participantItem}>
                  <Text style={styles.participantItemText}>{item}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.addParticipantContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter participant name"
                onChangeText={(text) => setParticipantName(text)}
                value={participantName}
              />
              <TouchableOpacity
                style={[styles.addButton, styles.drawNamesButton]}
                onPress={addParticipantHandler}
              >
                <Text style={styles.buttonText}>Add Participant</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {appState === 'addParticipants' && (
          <TouchableOpacity
            style={[styles.addButton, styles.drawNamesButton]}
            onPress={drawNames}
          >
            <Text style={styles.buttonText}>Draw Names</Text>
          </TouchableOpacity>
        )}
        {appState === 'showResults' && namesDrawn && results.length > 0 && (
          <>
            <Text style={styles.subtitle}>Results:</Text>
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={[styles.addButton, styles.drawNamesAgainButton]}
              onPress={drawNamesAgain}
            >
              <Text style={styles.buttonText}>Draw Names Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, styles.drawNamesButton]}
              onPress={() => setAppState('addParticipants')}
            >
              <Text style={styles.buttonText}>Add Participants</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d32f2f', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#d32f2f', 
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  presentImage: {
    width: 35,
    height: 35,
    marginBottom: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign:'center',
  },
  participantItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  participantItemText: {
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  resultItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  addParticipantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#FFD700',
    borderRadius: 15,
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    backgroundColor: '#DA9100',
  },
  addButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  drawNamesButton: {
    backgroundColor: '#013220',
  },
  drawNamesAgainButton: {
    backgroundColor: '#DA9100',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default App;
