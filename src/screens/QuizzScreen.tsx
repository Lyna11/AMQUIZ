import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { questions } from '../config/questions';

// Ecran de Quizz
export default function QuizzScreen() {

    // Données questions.ts
    const [data, setData] = useState(questions.naruto); // choix par défaut obligé
    const totalQuestions = data.length;
    const theme = ["Naruto", "DragonBall"]; // liste des thèmes
    // Index questions
    const [index, setIndex] = useState(0);
    // Question actuelle
    const currentQuestion = data[index];
    // Compteur score
    const [score, setScore] = useState(0);
    // Statut réponse (True = en cours / False = fini)
    const [quizzStatus, setQuizzStatus] = useState(false);
    // Réponse choisie
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    // Valeurs Timer
    const [countdown, setCountdown] = useState<number>(7);
    const [isPaused, setIsPaused] = useState<boolean>(true)
    // Booléen fin du quizz
    const [finQuizz, setFinQuizz] = useState(false);

    // Gestion du choix de thème
    function setTheme(item: string) {
        if (item === "Naruto") {
            setData(questions.naruto);
        }
        if (item === "DragonBall") {
            setData(questions.dragonball);
        }
    }

    // Gestion du Timer
    useEffect(() => {
        if (isPaused) return;
        // Si le compteur atteint 0 on passe à la question suivante
        if (countdown === 0 || countdown < 0) {
            // Evite que le score soit négatif
            if (score >= 5) {
                setScore((score) => score - 5);
            } else {
                setScore(0);
            }
            if (index < data.length) {
                setIndex((index) => index + 1);
            }
            setCountdown(7);
        }
        const interval = setInterval(() => {
            setCountdown((countdown) => countdown - 1)
        }, 1000);
        // Reset
        return () => clearInterval(interval);
    }, [countdown, isPaused]);

    // Gestion boucle de jeu
    useEffect(() => { 
        // Lancement du Timer
        if (quizzStatus === true) {
            setIsPaused(false);
            setFinQuizz(false);
        } 
        // Le quizz s'arrête lorsqu'il n'y a plus de questions
        if ((quizzStatus === true && index >= data.length) || currentQuestion === undefined) {
            setIsPaused(true);
            setFinQuizz(true);
        }
    }, [currentQuestion, quizzStatus]);

    // Gestion choix réponses
    useEffect(() => {
        // Null check
        if (selectedAnswer === null || !currentQuestion) return;
        // Timeout
        let timeout: NodeJS.Timeout;
        // Si la réponse est correcte...
        if (selectedAnswer === currentQuestion.answerId) {
            timeout = setTimeout(() => {
                setScore((score) => score + 10);
                setIndex((index) => index + 1);
                setCountdown(7);
                setSelectedAnswer(null);
            }, 1000);
        // Si la réponse est fausse...
        } else {
            timeout = setTimeout(() => {
                if (score >= 5) {
                    setScore((score) => score - 5);
                } else {
                    setScore(0);
                }
                setIndex((index) => index + 1);
                setCountdown(7);
                setSelectedAnswer(null); 
            }, 1000);
        }
        // Nettoyage timeout
        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [selectedAnswer]);

    /****************************************************************/

    // Rendu
    return (

        <SafeAreaView>

            <Text style={styles.title}>QUIZZ</Text>

            {quizzStatus === false && finQuizz === false ?
                <>
                    <SelectDropdown data={theme} onSelect={(selectedItem, index) => { setTheme(selectedItem) }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                        rowTextForSelection={(item, index) => { return item }}
                        dropdownStyle={styles.dropdown} buttonStyle={styles.select} />
                    
                    <Button title="Démarrer" onPress={() => setQuizzStatus(true)}></Button>
                </> :
                <>
                    <Text style={styles.timer}>TIMER: {countdown}s</Text>
                    <Text style={styles.counter}>{finQuizz === false ? ("Score : " + score) : ('Quizz terminé ! Résultat : ' + score + '/' + (totalQuestions * 10))}</Text>

                    <View>
                        <Text style={styles.question}>
                            {index === data.length ? undefined : '(' + (index + 1) + '/' + totalQuestions + ') ' + currentQuestion?.question}
                        </Text>

                        <View style={{ marginTop: 10 }}>
                            {currentQuestion?.choices.map((item, index) => (

                            <TouchableOpacity key={index} onPress={() => setSelectedAnswer(item.id)} style={{ borderColor: "red", padding: 10 }}>
                                <View style={styles.cards}>

                                    <Text style={{ color: selectedAnswer === item.id ? (selectedAnswer === currentQuestion.answerId ? 'green' : 'red') : undefined }}>
                                        {item.id} - {item.answer}
                                    </Text>

                                </View>
                            </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                </>
            }

        </SafeAreaView>
    );

}

/* Pour CSS */
const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: '#e91e63',
        padding: 10
    },
    question: {
        fontWeight: "bold",
        fontSize: 18,
        padding: 5,
        margin: 0
    },
    cards: {
        color: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        padding: 5,
        maxWidth: 250,
        textShadowRadius: 1,
        textShadowColor: "black",
    },
    counter: {
        color: "white",
        backgroundColor: '#e91e63',
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    timer: {
        fontSize: 18,
        color: '#6A5ACD',
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 10,
        paddingLeft: 10
    },
    select: {
        maxWidth: 200,
        maxHeight: 100,
        borderColor: "black",
        borderWidth: 1,
        padding: 0
    },
    dropdown: {
        maxHeight: 50,
    }
});