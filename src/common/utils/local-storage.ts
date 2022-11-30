export const saveState = (state: any): void => {
  try {
    localStorage.setItem('accessToken', JSON.stringify(state));
  } catch (error: any) {
    // console.log('Local Storage error ');
  }
};

export const loadState = (): string | undefined => {
  try {
    const serializedState = localStorage.getItem('accessToken');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error: any) {
    // console.log('Local Storage error ');
  }
};
