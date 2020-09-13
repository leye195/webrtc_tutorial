type userData = {
  userId: string;
  password: string;
};
export const saveUser = (type: string, { userId, password }: userData) => {
  if (type !== null) {
    if (localStorage.getItem(type)) {
      const data = loadUser(type);
      localStorage.setItem(
        type,
        JSON.stringify([...data, { userId, password }])
      );
    } else {
      localStorage.setItem(type, JSON.stringify([{ userId, password }]));
    }
  }
};

export const loadUser = (type: string) => {
  if (localStorage.getItem(type)) {
    const data = JSON.parse(localStorage.getItem(type)!);
    return data;
  }
  return [];
};

export const checkExist = (type: string, { userId, password }: userData) => {
  const data = loadUser(type);
  if (data.length > 0) {
    const tmp = data.filter((user: userData) => user.userId === userId);
    if (tmp.length > 0) return true;
    return false;
  }
  return false;
};
