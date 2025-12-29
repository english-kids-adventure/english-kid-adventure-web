import React, { type ChangeEvent, useCallback } from 'react';

export type CoreFormActions<TField = string> =
  | { type: 'UPDATE_FIELD'; field: TField; value: unknown }
  | { type: 'TOGGLE_EYE'; field: TField }
  | { type: 'RESET_FORM' };

export const useFormHandler = <TAction extends { type: string }>(
  dispatch: React.Dispatch<TAction | CoreFormActions<string>>,
) => {
  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value,
    });
  }, [dispatch]);

  const handleTogglePassword = useCallback((field: string) => {
    dispatch({
      type: 'TOGGLE_EYE',
      field,
    });
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, [dispatch]);

  return { handleChange, handleTogglePassword, handleReset };
};
