import { ChainBase } from '@hicommonwealth/shared';
import { AuthSSOs, AuthWallets } from '../../components/AuthButton/types';

export type AuthModalTabs = {
  name: string;
  options: AuthWallets[] | AuthSSOs[];
};

export type CreateAccountModal = {
  onClose: () => void;
};

export type SignInModalProps = {
  onClose: () => any;
  onSuccess?: () => any;
  showWalletsFor?:
    | ChainBase.Ethereum
    | ChainBase.CosmosSDK
    | ChainBase.Solana
    | ChainBase.Substrate;
};

export type AuthModalProps = {
  isOpen: boolean;
  type?: 'create-account' | 'sign-in';
} & SignInModalProps;
