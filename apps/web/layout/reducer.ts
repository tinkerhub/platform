export enum ActionKind {
  'Auth_AND_BASE',
  'Auth_OtherPage',
  'No_AUTH',
  'NO_BTN_PATH',
}

interface ReducerState {
  btnText: string;
  btnFunction: () => void | Promise<void>;
  showBtn: boolean;
}

type Action = {
  type: ActionKind;
  payload: () => void | Promise<void>;
};

export const AuthReducer = (state: ReducerState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.Auth_AND_BASE:
      return {
        btnText: 'My Profile',
        showBtn: true,
        btnFunction: payload,
      };
    case ActionKind.Auth_OtherPage:
      return {
        btnText: 'LogOut',
        showBtn: true,
        btnFunction: payload,
      };
    case ActionKind.No_AUTH:
      return {
        btnText: 'Login',
        showBtn: true,
        btnFunction: payload,
      };
    case ActionKind.NO_BTN_PATH:
      return {
        ...state,
        showBtn: false,
      };

    default:
      return state;
  }
};
