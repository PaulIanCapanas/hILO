import { render, waitFor } from '@testing-library/react-native'
import UserDetail from '@/components/UserDetail'

jest.mock('@/contexts/AuthContext', () => ({
  useSession: jest.fn(() => ({
    user: {
      uid: 'test-uid',
      email: 'test@example.com',
    },
    isLoading: false,
    logOut: jest.fn(),
  })),
}))

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({
      uid: 'test-uid',
      email: 'test@example.com',
    })
    return jest.fn()
  }),
}))

jest.mock('@/firebase/initializeFirebase', () => ({
  auth: jest.fn(),
}))

jest.mock('@/helpers/firebase/queryDocument', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([
    {
      uid: 'test-uid',
      name: 'test-user',
      photo: 'test-photo-url',
    },
  ]),
}))

describe('User Detail Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('it renders correctly', async () => {
    const { getByText, getByTestId } = render(<UserDetail />)

    await waitFor(() => {
      expect(getByText('test-user')).toBeTruthy()
      expect(getByTestId('profile-picture')).toBeTruthy()
    })
  })

  test('shows loading state', () => {
    const { getByTestId } = render(<UserDetail />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })
})
