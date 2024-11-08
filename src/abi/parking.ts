import { Abi } from 'starknet'

export default JSON.parse(`[
  {
    "name": "ParkingImpl",
    "type": "impl",
    "interface_name": "starkparking_contract::parking::IParking"
  },
  {
    "name": "core::integer::u256",
    "type": "struct",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "name": "core::bool",
    "type": "enum",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "name": "starkparking_contract::parking::ParkingLot",
    "type": "struct",
    "members": [
      {
        "name": "lot_id",
        "type": "core::integer::u256"
      },
      {
        "name": "name",
        "type": "core::felt252"
      },
      {
        "name": "location",
        "type": "core::felt252"
      },
      {
        "name": "coordinates",
        "type": "core::felt252"
      },
      {
        "name": "slot_count",
        "type": "core::integer::u32"
      },
      {
        "name": "hourly_rate_usd_cents",
        "type": "core::integer::u32"
      },
      {
        "name": "creator",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "wallet_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "is_active",
        "type": "core::bool"
      },
      {
        "name": "registration_time",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "name": "starkparking_contract::parking::IParking",
    "type": "interface",
    "items": [
      {
        "name": "register_parking_lot",
        "type": "function",
        "inputs": [
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          },
          {
            "name": "name",
            "type": "core::felt252"
          },
          {
            "name": "location",
            "type": "core::felt252"
          },
          {
            "name": "coordinates",
            "type": "core::felt252"
          },
          {
            "name": "slot_count",
            "type": "core::integer::u32"
          },
          {
            "name": "hourly_rate_usd_cents",
            "type": "core::integer::u32"
          },
          {
            "name": "wallet_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "book_parking",
        "type": "function",
        "inputs": [
          {
            "name": "booking_id",
            "type": "core::felt252"
          },
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          },
          {
            "name": "payment_token",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "license_plate",
            "type": "core::felt252"
          },
          {
            "name": "duration",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "end_parking",
        "type": "function",
        "inputs": [
          {
            "name": "booking_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "extend_parking",
        "type": "function",
        "inputs": [
          {
            "name": "booking_id",
            "type": "core::felt252"
          },
          {
            "name": "additional_hours",
            "type": "core::integer::u32"
          },
          {
            "name": "payment_token",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "impose_penalty",
        "type": "function",
        "inputs": [
          {
            "name": "license_plate",
            "type": "core::felt252"
          },
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          },
          {
            "name": "amount_usd_cents",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_payment_token",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_parking_lot",
        "type": "function",
        "inputs": [
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "starkparking_contract::parking::ParkingLot"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_available_slots",
        "type": "function",
        "inputs": [
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "validate_license_plate",
        "type": "function",
        "inputs": [
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          },
          {
            "name": "license_plate",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "has_outstanding_penalty",
        "type": "function",
        "inputs": [
          {
            "name": "license_plate",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_oracle_token_quote",
        "type": "function",
        "inputs": [
          {
            "name": "lot_id",
            "type": "core::integer::u256"
          },
          {
            "name": "payment_token",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "duration",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_asset_price",
        "type": "function",
        "inputs": [
          {
            "name": "asset_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "PausableImpl",
    "type": "impl",
    "interface_name": "openzeppelin_security::interface::IPausable"
  },
  {
    "name": "openzeppelin_security::interface::IPausable",
    "type": "interface",
    "items": [
      {
        "name": "is_paused",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "OwnableImpl",
    "type": "impl",
    "interface_name": "openzeppelin_access::ownable::interface::IOwnable"
  },
  {
    "name": "openzeppelin_access::ownable::interface::IOwnable",
    "type": "interface",
    "items": [
      {
        "name": "owner",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "transfer_ownership",
        "type": "function",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "renounce_ownership",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "pragma_contract",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "payment_token",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "name": "pause",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "name": "unpause",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "OwnershipTransferred",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        "kind": "nested",
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_security::pausable::PausableComponent::Paused",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_security::pausable::PausableComponent::Unpaused",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin_security::pausable::PausableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Paused",
        "type": "openzeppelin_security::pausable::PausableComponent::Paused"
      },
      {
        "kind": "nested",
        "name": "Unpaused",
        "type": "openzeppelin_security::pausable::PausableComponent::Unpaused"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "starkparking_contract::parking::Parking::ParkingLotRegistered",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "lot_id",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "starkparking_contract::parking::Parking::ParkingBooked",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "booking_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "lot_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "entry_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "license_plate",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "duration",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "starkparking_contract::parking::Parking::ParkingExtended",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "booking_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "additional_hours",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "starkparking_contract::parking::Parking::ParkingEnded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "booking_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "exit_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "total_payment",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "starkparking_contract::parking::Parking::PenaltyImposed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "license_plate",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "lot_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "penalty_amount",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "starkparking_contract::parking::Parking::Event",
    "type": "event",
    "variants": [
      {
        "kind": "flat",
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      },
      {
        "kind": "flat",
        "name": "PausableEvent",
        "type": "openzeppelin_security::pausable::PausableComponent::Event"
      },
      {
        "kind": "nested",
        "name": "ParkingLotRegistered",
        "type": "starkparking_contract::parking::Parking::ParkingLotRegistered"
      },
      {
        "kind": "nested",
        "name": "ParkingBooked",
        "type": "starkparking_contract::parking::Parking::ParkingBooked"
      },
      {
        "kind": "nested",
        "name": "ParkingExtended",
        "type": "starkparking_contract::parking::Parking::ParkingExtended"
      },
      {
        "kind": "nested",
        "name": "ParkingEnded",
        "type": "starkparking_contract::parking::Parking::ParkingEnded"
      },
      {
        "kind": "nested",
        "name": "PenaltyImposed",
        "type": "starkparking_contract::parking::Parking::PenaltyImposed"
      }
    ]
  }
]`) satisfies Abi
