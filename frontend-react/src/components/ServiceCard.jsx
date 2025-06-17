// components/ServiceCard.jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const ServiceCard = ({ icon, title, description, actionText, onAction }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {icon && <div className="text-green-600">{icon}</div>}
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 mb-4">
          {description}
        </CardDescription>
        <Button onClick={onAction} variant="outline" className="w-full">
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
