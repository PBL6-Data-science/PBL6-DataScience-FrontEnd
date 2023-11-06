interface BaseNewsProps {
  id: string;
  title: string;
  content: string;
  decript: string;
  postDate: string | null;
  typeName: string;
  statusName: string;
  backgroundUrl: string | null;
  createBy: string | null;
  createDate: string | null;
  lastUpdateDate: string | null;
  lastUpdateby: string | null;
  countView: number;
  delFlg: boolean;
}

interface NewsItemProps {
  News: {
    backGroundUrl: string | null;
    userImageUrl: string | null;
    title: string;
    typeName: string;
    statusName: string;
    countView: number;
    postDate: string | null;
    totalCommnet: number;
  };
}

interface NewsPredictProps {
  id: string;
  title: string;
  content: string;
  decript: string;
  typeName: string;
  satisfied: number;
}

interface NewsStatusProps {
  StatusID: number;
  StatusName: string;
  StatusDelFlg: boolean;
}
