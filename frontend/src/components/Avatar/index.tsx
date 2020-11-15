import React, { ChangeEvent, useCallback } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AvatarInput, ImageAvatar, LabelStyles } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface UserInterface {
  id: string;
  avatar_front?: string;
  avatar_front_old?: string;
}
interface AvatarInterface {
  route: string;
  image: string;
  // eslint-disable-next-line react/require-default-props
}
const Avatar: React.FC<AvatarInterface> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image,
  route,
}: AvatarInterface) => {
  const { refreshUser, user } = useAuth();
  const newUser = user as UserInterface;
  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('old', String(newUser.avatar_front_old));

        await api.post(`/filesFront/${newUser.id}`, data);
        refreshUser(newUser.id);
      }
    },
    [route, refreshUser, newUser],
  );
  return (
    <AvatarInput>
      <ImageAvatar src={newUser.avatar_front} />
      <LabelStyles htmlFor="avatar">
        <AiOutlinePlusCircle />
        <input
          type="file"
          id="avatar"
          name="file"
          onChange={handleAvatarChange}
        />
      </LabelStyles>
    </AvatarInput>
  );
};

export default Avatar;
