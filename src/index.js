import React from "react";
import { render } from "react-dom";

import { Admin, Resource, Delete } from "react-admin";
import jsonRestDataProvider from "ra-data-fakerest";

import addUploadFeature from "./addUploadFeature";

import data from "./data";
import authProvider from "./authProvider";
import i18nProvider from "./i18n/provider";

import { PostList, PostCreate, PostEdit, PostShow, PostIcon } from "./posts";
import {
  CommentList,
  CommentEdit,
  CommentCreate,
  CommentShow,
  CommentIcon
} from "./comments";

const dataProvider = jsonRestDataProvider(data, true);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const delayedDataProvider = (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(uploadCapableDataProvider(type, resource, params)),
      1000
    )
  );

render(
  <Admin
    title="Debug Admin"
    dataProvider={delayedDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      create={PostCreate}
      edit={PostEdit}
      show={PostShow}
      remove={Delete}
      icon={PostIcon}
    />
    <Resource
      name="comments"
      list={CommentList}
      create={CommentCreate}
      edit={CommentEdit}
      show={CommentShow}
      remove={Delete}
      icon={CommentIcon}
    />
    <Resource name="tags" />
  </Admin>,
  document.getElementById("root")
);
