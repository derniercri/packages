import { render } from '@testing-library/react-native';
import React from 'react';

import Button from './button';

it('renders correctly', () => {
  render(<Button>Hello, World !</Button>);
});
