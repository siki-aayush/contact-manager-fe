import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Typography } from "antd";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../../interfaces/Contact";
import { useSelector } from "react-redux";

import "./ContactList.css";
import { RootState } from "../../redux/store";
import Loading from "../../hoc/Loading";

const ContactList: React.FC = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [endOfPage, setEndOfPage] = useState<Boolean>(false);

  // const id = getUserIdFromLocalStorage();
  const id = useSelector((state: RootState) => state.user.id) || 1;
  const containerHeight = 850;
  const itemHeight = 50;

  const { Title } = Typography;

  /**
   * Fetches the contacts from the API
   * whenever the page number changes
   */
  useEffect(() => {
    getData(id, page);
  }, [page, id]);

  const getData = (id: number, page: number) => {
    setIsLoading(true);
    axios
      .post("/contacts", { id }, { params: { page } })
      .then((res) => {
        const newData = res.data.data;
        if (newData.length !== 0) {
          setData((prev) => [...prev, ...newData]);
        } else {
          setEndOfPage(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  /**
   *  Loads more contact data
   * @param {React.UIEvent } e
   * */
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        containerHeight &&
      !endOfPage
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * Deletes contact
   * @param {Contact} item
   * */
  const updateContactFavourite = async (item: Contact) => {
    try {
      const res = await axios.patch(`/contacts/${item.id}`, {
        id: item.id,
        is_favourite: !item.is_favourite,
      });
      if (res.data.data) {
        // Refreshes the data
        setData([]);
        setPage(1);
        getData(id, 1);
      }
    } catch (error) {}
  };

  /**
   * Deletes contact
   * @param {string} id
   * */
  const onDeleteHandler = async (id: string) => {
    try {
      const res = await axios.delete(`/contacts/${id}`);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <List className="contacts" header={<Title>Contacts</Title>}>
        <VirtualList
          data={data}
          height={containerHeight}
          itemHeight={itemHeight}
          itemKey="id"
          onScroll={onScroll}
          className="contacts__list"
        >
          {(item: Contact) => (
            <List.Item
              key={item.id}
              actions={[
                item.is_favourite ? (
                  <HeartFilled
                    style={{ fontSize: "20px", color: "#bf2c21" }}
                    onClick={() => updateContactFavourite(item)}
                  />
                ) : (
                  <HeartOutlined
                    style={{ fontSize: "20px" }}
                    onClick={() => updateContactFavourite(item)}
                  />
                ),
                <Link to={`/contacts/update/${item.id}`}>
                  <Button>Edit</Button>
                </Link>,
                <Button onClick={() => onDeleteHandler(item.id)}>
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.photograph} />}
                title={item.name}
                description={item.phone}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </Loading>
  );
};

export default ContactList;
