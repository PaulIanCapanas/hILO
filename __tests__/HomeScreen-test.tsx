import { render } from '@testing-library/react-native';
import React from 'react';
import HomeScreen from '@/app/(tabs)/index';
import TabTwoScreen from '@/app/(tabs)/explore';
import Page from '@/app/index';


describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    // Check if the HomeScreen renders the text "Welcome!"
    getByText('Welcome!');
  });

  test('TabTwoScreen Renders correctly', () => {
    const { getByText } = render(<TabTwoScreen/>);

    // Check if the CustomText component renders the text "Custom Text Content"
    getByText('This app includes example code to help you get started.');
  });
});

// describe('Main Landing Page', () => {
//   test('Renders the main page correctly', () => {
//     const { getByText } = render(<Page/>);

//     getByText('Hello World');
//   });
// })
