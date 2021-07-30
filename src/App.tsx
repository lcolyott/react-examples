import React from 'react';
import "./App.scss";
import APIExample from './examples/api';
import ComponentExamples from './examples/components';
import ContextExample from './examples/context';
import HooksExample from './examples/hooks';
import RoutingExample from './examples/routing';
import ComplexInputExercise from './exercises/complexInput';
import Hooks from './exercises/hooks';
import Routing from './exercises/routing/Index';

function App() {
  return (
    <div className={"App"}>
      <Routing />
      <Hooks />
      <ComponentExamples />
      <HooksExample />
      <APIExample />
      <ContextExample />
      <RoutingExample />
    </div>
  );
};

export default App;