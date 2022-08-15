import { Avatar, List } from "antd";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";

import "./ContactList.css";

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  photograph: string;
  address: string;
  is_favouriate: boolean;
}

const ContainerHeight = 300;

const ContactList: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    console.log("hello i'm running", page);
    axios
      .get("/contacts", { params: { page } })
      .then((res) => {
        console.log("inside", res);

        setData((prev) => [...prev, ...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (data) {
    return (
      <List className="contacts">
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="id"
          onScroll={onScroll}
          className="contacts__list"
        >
          {(item: UserItem) => (
            <List.Item key={Date.now()}>
              <List.Item.Meta
                avatar={<Avatar src={item.photograph} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ContactList;
