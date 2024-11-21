import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BurgerModal from '@/components/Burger';


jest.mock('@/contexts/AuthContext', () => ({
  useSession: jest.fn(() => ({
    user: {
      uid: 'test-uid',
      email: 'test@example.com',
    },
    isLoading: false,
    logOut: jest.fn(),
  })),
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({
      uid: 'test-uid',
      email: 'test@example.com',
    });
    return jest.fn();
  }),
}));

jest.mock('@/firebase/initializeFirebase', () => ({
  auth: jest.fn(),
}));

jest.mock('@/helpers/firebase/queryDocument', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([
    {
      uid: 'test-uid',
      firstName: 'John',
      lastName: 'Doe',
      photo: 'test-photo-url',
    },
  ]),
}));

describe('BurgerModal Component', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <BurgerModal
        isVisible={true} 
        onClose={mockOnClose} 
        {...props} 
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders burger menu correctly', () => {
    const { getByTestId } = renderComponent();
    
    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeTruthy();
  });

  test('calls onClose when close menu is pressed', () => {
    const { getByTestId } = renderComponent();
    
    fireEvent.press(getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders correctly when visible', () => {
    const { getByTestId } = renderComponent();
    
    const modalOverlay = getByTestId('modal-overlay');
    expect(modalOverlay).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByTestId } = render(
      <BurgerModal isVisible={false} onClose={mockOnClose} />
    );
    
    const modalOverlay = queryByTestId('modal-overlay');
    expect(modalOverlay).toBeNull();
  });

  test('calls onClose when overlay is pressed', () => {
    const { getByTestId } = renderComponent();
    
    const overlay = getByTestId('modal-overlay');
    fireEvent.press(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});