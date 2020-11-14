import React, { ChangeEvent, useCallback } from 'react';
import { RiImageLine } from 'react-icons/ri';
import { CoverInput, ImageCover } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface UserInterface {
  id: string;
  avatar_back: string;
  username: string;
}
const Cover: React.FC = ({ children }) => {
  const { user, refreshUser } = useAuth();
  const newUser = user as UserInterface;
  const handleCoverChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        api.post(`/filesBack/${newUser.id}`, data).then(() => {
          refreshUser(newUser.id);
        });
      }
    },
    [refreshUser, newUser],
  );
  return (
    <CoverInput>
      <ImageCover src={newUser.avatar_back} />
      <label htmlFor="cover">
        <RiImageLine />

        <input
          type="file"
          id="cover"
          name="file"
          onChange={handleCoverChange}
        />
      </label>
      {children}
    </CoverInput>
  );
};

export default Cover;
