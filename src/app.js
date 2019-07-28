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
        weightText = `${workoutLogs.logs.length}x${lastNumber || 5}`;
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
                    <WorkoutTracker path="/workout/:workoutId" />
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
                    <Link to="/workout/1">
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
                    </Link>
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

class WorkoutTracker extends React.Component {
    constructor(props) {
        super(props);

        const newWorkout = {...futureWorkout};
        newWorkout.workouts.forEach(workout => {
            workout.logs.forEach((log, index) => {
                workout.logs[index] = null;
            });
        });
        this.state = {
            workout: newWorkout
        };

        this.handleLogClick = this.handleLogClick.bind(this);

        this.descriptionText = futureWorkout.workouts.map(getWorkoutText);
        this.newWorkoutDate = new Date();
    }

    handleLogClick(workoutIndex) {
        return (index) => {
            return () => {
                const newState = {...this.state.workout};
                const newWorkoutLog = {...newState.workouts[workoutIndex]};

                if (newWorkoutLog.logs[index] === null) {
                    newWorkoutLog.logs[index] = 5;
                } else if (newWorkoutLog.logs[index] === 1) {
                    newWorkoutLog.logs[index] = null;
                } else {
                    newWorkoutLog.logs[index]--;
                }

                newState.workouts[workoutIndex] = newWorkoutLog;

                this.setState({
                    workout: newState
                })
            }
        }
    }

    render() {
        return <div>
            <Link to="/">Back</Link>
            <p>{this.newWorkoutDate.toString()}</p>
            <ul>
                {this.state.workout.workouts.map((workout, workoutIndex) => {
                    return (
                        <li key={workout.name}>
                            <div>
                                <p>{workout.name}</p>
                                <p>{this.descriptionText[workoutIndex]}</p>

                                {workout.logs.map((log, index) => {
                                    return (<button key={index} onClick={this.handleLogClick(workoutIndex)(index)}>
                                        {log || "Empty"}
                                    </button>)
                                })}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>;
    }
}

export default App;