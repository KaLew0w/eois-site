import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function UserAvatar() {
    return (
        <Avatar
            size={ 40 }
            icon={<UserOutlined  />}
        />
    )
}