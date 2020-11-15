import React, { ChangeEvent, useEffect, useState } from 'react';
import { RiImageLine } from 'react-icons/ri';
import { CoverInput, ImageCover } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface UserInterface {
  id: string;
  avatar_back: string;
  avatar_back_Old?: string;
  username: string;
}
const Cover: React.FC = ({ children }) => {
  const { user, refreshUser } = useAuth();
  const [newUser, setNewUser] = useState<UserInterface>();
  const userInitial = user as UserInterface;
  useEffect(() => {
    setNewUser(userInitial);
  }, []);
  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();
      data.append('file', e.target.files[0]);
      data.append('old_file', String(newUser?.avatar_back_Old));
      await api.post(`/filesBack/${newUser?.id}`, data);
      const response = await api.post(`/list/${newUser?.id}`);
      const userAlter = response.data.data;
      setNewUser(userAlter);
      refreshUser(userAlter.id);
    }
  };
  return (
    <CoverInput>
      <ImageCover src={newUser?.avatar_back} />
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
