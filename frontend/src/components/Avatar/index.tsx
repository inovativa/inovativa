import React, { ChangeEvent, useCallback } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AvatarInput, ImageAvatar, LabelStyles } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface UserInterface {
  id: string;
  avatar_front?: string;
}
interface AvatarInterface {
  route: string;
  image: string;
  // eslint-disable-next-line react/require-default-props
  user?: UserInterface;
}
const Avatar: React.FC<AvatarInterface> = ({
  image,
  route,
  user = {
    id: '',
    avatar_front: '',
  },
}: AvatarInterface) => {
  const { refreshUser } = useAuth();
  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        await api.post(route, data);
        refreshUser(user.id);
      }
    },
    [route, refreshUser, user],
  );
  return (
    <AvatarInput>
      <ImageAvatar src={user.avatar_front} />
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
