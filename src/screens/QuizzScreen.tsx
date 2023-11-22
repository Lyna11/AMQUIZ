import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {questionsQuizz} from '../config/questions';

export default function QuizzScreen() {

    /* TODO: "questionsQuizz not defined" à régler ! */
    const data = questionsQuizz.questions;
    const currentQuestion = data[0];
    console.log(currentQuestion);

    // Rendu
    return (
        <View>
            <Text>QUIZZ</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text>blabla</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'blue' }}>
                <Text>{currentQuestion?.question}</Text>
            </View>

        </View>
    );

}

/* Pour CSS */
const styles = StyleSheet.create({
  /* TODO */
});