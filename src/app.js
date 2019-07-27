import React from "react";
import { Router, Link } from "@reach/router";

const workoutHistory = [
    {
        date: "Tue 23 Jul",
        workouts: [
            {
                name: "Squat",
                weight: 135,
                logs: [
                    "5",
                    "5",
                    "5",
                    "5",
                    "5"
                ]
            },
            {
                name: "Bench Press",
                weight: 120,
                logs: [
                    "5",
                    "5",
                    "5",
                    "5",
                    "5"
                ]
            },
            {
                name: "Barbell Row",
                weight: 95,
                logs: [
                    "5",
                    "5",
                    "5",
                    "5",
                    "5"
                ]
            }
        ]
    },
    {
        date: "Fri 19 Jul",
        workouts: [
            {
                name: "Squat",
                weight: 130,
                logs: [
                    "5",
                    "5",
                    "5",
                    "5",
                    "5"
                ]
            },
            {
                name: "OH Press",
                weight: 75,
                logs: [
                    "5",
                    "5",
                    "5",
                    "5",
                    "5"
                ]
            },
            {
                name: "Deadlift",
                weight: 135,
                logs: [
                    "5"
                ]
            }
        ]
    }
];

function getWorkoutText(workoutLogs) {
    let weightText = workoutLogs.logs.join("/");

    let lastNumber = workoutLogs.logs[0];
    for (let i = 1; i < workoutLogs.logs.length; i++) {
        const current = workoutLogs.logs[i];

        if (lastNumber !== current) {
            lastNumber = false;
            break;
        }
    }

    if (lastNumber !== false) {
        weightText = `${workoutLogs.logs.length}x${lastNumber}`;
    }

    return `${weightText} ${workoutLogs.weight}lb`;
}

const futureWorkout = {
    date: "Next",
    workouts: [
        {
            name: "Squat",
            weight: 135,
            logs: [
                "5",
                "5",
                "5",
                "5",
                "5"
            ]
        },
        {
            name: "Bench Press",
            weight: 120,
            logs: [
                "5",
                "5",
                "5",
                "5",
                "5"
            ]
        },
        {
            name: "Barbell Row",
            weight: 95,
            logs: [
                "5",
                "5",
                "5",
                "5",
                "5"
            ]
        }
    ]
};

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>5x5</h1>

                <Router>
                    <Home path="/" />
                </Router>
            </div>
        )
    }
}

function Home() {
    return (
        <div>
            <h1>Workout</h1>
            <ul>
                <li>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Exercise</th>
                                <th>sets and reps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {futureWorkout.workouts.map((workoutLog, index) => (
                                <tr key={index}>
                                    {index === 0 && <td rowSpan="3">{futureWorkout.date}</td>}
                                    <td>{workoutLog.name}</td>
                                    <td>{getWorkoutText(workoutLog)}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </li>
                {workoutHistory.map(workout => (
                    <li key={workout.date}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Exercise</th>
                                    <th>sets and reps</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workout.workouts.map((workoutLog, index) => (
                                    <tr key={index}>
                                        {index === 0 && <td rowSpan="3">{workout.date}</td>}
                                        <td>{workoutLog.name}</td>
                                        <td>{getWorkoutText(workoutLog)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;